
const definitions = require('./definitions');
const opcode2sb = definitions.opcode2sb;
const defaults = definitions.opcode2sbdefaults;

const express = require('express');
const app = express();
const port = 3000;

const { loadProjectJson, loadSb3, loadCloudId, BlockCollection, SpriteCollection, Block } = require('sb-util');

// Get the blocks code for a block within a script
function getScriptBlocksCode(next, sprite) {

  console.log(`Generating: ${sprite.prop('name')}`);

  var opcode = next.prop('opcode');
  blockcode = opcode2sb[opcode];
  
  console.log(opcode);

  console.log("Inputs");
  console.log(next.prop('inputs'));
  console.log("Fields");
  console.log(next.prop('fields'))

  switch (opcode) {

    case "procedures_definition":
      input = sprite.blocks().byId(next.prop('inputs')['custom_block']['block']).prop('mutation')['proccode'];
      blockcode = blockcode.replace('%PROCCODE%', input);
      break;

    case "procedures_call":
      input = next.prop('mutation')['proccode'];
      blockcode = blockcode.replace("%PROCCODE%", input);
      break;

    default:
      blockcode = fieldReplace(next, sprite);
      break;
  }

  blockcode = blockcode.replace('%CONDITION%', '<>');
  blockcode = blockcode.replace('%OPERAND%', '<>');
  blockcode = blockcode.replace('%OPERAND1%', '<>');
  blockcode = blockcode.replace('%OPERAND2%', '<>');
  blockcode = blockcode.replace("%SUBSTACK%", '');
  blockcode = blockcode.replace("%SUBSTACK2%", '');
  // Could do something more sophisticated to avoid accidental matches
  blockcode = blockcode.replace("_mouse_ v", 'mouse-pointer v');
  blockcode = blockcode.replace("_edge_ v", 'edge v');
  blockcode = blockcode.replace("_myself_ v", 'myself v');
  blockcode = blockcode.replace("_random_ v", 'random position v');
}

// Replace each of the inputs with the blocks code for the referenced block
// TODO:  handle substacks here too
function fieldReplace(block, sprite) {

  console.log(`Field replace: ${sprite.prop('name')}`);

  var blockcode = opcode2sb[block.prop('opcode')];
  console.log(block.prop('opcode'));
  
  var fields = block.prop('fields');
  console.log("Replacing fields");
  console.log(fields);

  for (var i in fields) {
      blockcode = blockcode.replace(`%${fields[i]['name']}%`, fields[i]['value']);
  }

  var inputs = block.prop('inputs');
  console.log("Replacing inputs");
  console.log(inputs);

  var comment = getComment(block, sprite);

  if(comment != "")
  {
    comment =  " // " + comment; 

    if(inputs['SUBSTACK'] !== undefined)
      blockcode = blockcode.replace(/\n/, `${comment}\n`);
    else
      blockcode += comment;

  }

  for (var i in inputs) {
    if (!inputs[i]['name'].includes('SUBSTACK')) {
      blockcode = blockcode.replace(`%${inputs[i]['name']}%`, fieldReplace(sprite.blocks().byId(inputs[i]['block']), sprite));
    }
    else
    {
      blockcode = blockcode.replace('%SUBSTACK%', generateScript(sprite.blocks().byId(block.prop('inputs')['SUBSTACK']['block']), sprite))

      if(block.prop('inputs')['SUBSTACK2'] !== undefined)
      {
        blockcode = blockcode.replace('%SUBSTACK2%', generateScript(sprite.blocks().byId(block.prop('inputs')['SUBSTACK2']['block']), sprite));
      }
    }
  }

  return blockcode;
}

function getComment(block, sprite)
{
  const id = block.prop('id');
  const comments = sprite.prop('comments');
  var text ="";

  for(var comment in comments){
    if(comments[comment]['blockId'] == id)
    {
      text =comments[comment]['text'];
      console.log("found comment");
      continue;
    }
  }

  return text;
}

// Generate a script starting from the first block 
function generateScript(first, sprite) {

  if(first === null)
    return "";

  console.log(`Generating script: ${sprite.prop('name')}`);

  var next = first;
  var script = "";

  do {
    var opcode = next.prop('opcode');
    getScriptBlocksCode(next, sprite);

    console.log(`${opcode}: ${blockcode}`);

    if (blockcode) 
      script += blockcode + "<br/>";
    
    next = sprite.blocks().byId(next.prop('next'));

  } while (next)

  return script;
}

app.get('/categories/:projectId', async (req, res) => {
  //const sp = await loadProjectJson('455910740.json');
  //const sp = await loadProjectJson('https://projects.scratch.mit.edu/461059643');

  const sp = await loadCloudId(req.params.projectId);

  const counts = [];
  const blocks = sp.blocks();
  const types = {
    motion: "Motion",
    looks: "Looks",
    sound: "Sound",
    event: "Events",
    control: "Control",
    sensing: "Sensing",
    operator: "Operators",
    data: "Variables",
    procedures: "My Blocks",
    music: "Music",
    pen: "Pen",
    videoSensing: "Video Sensing",
    tts: "Text to Speech",
    translate: "Translate"
  };

  var total = 0;
  for (const blockType in types) {
    const typeBlocks = blocks.query("." + blockType);
    var count = 0;
    const blocksCount = {};
    for (const b of typeBlocks) {
      var opcode = b.prop('opcode');
      if (opcode.includes("menu")) {
        continue
      }
      if (opcode.includes("options")) {
        continue
      }
      if (opcode.includes("looks_backdrops")) {
        continue
      }
      if (opcode.includes("looks_costume")) {
        continue
      }
      if (opcode.includes("_prototype")) {
        continue
      }
      opcode = defaults[opcode];
      if (!(opcode in blocksCount)) {
        blocksCount[opcode] = 1;
      } else {
        blocksCount[opcode] = blocksCount[opcode] + 1;
      }
      count++;
      total++;
    };

    counts.push({ name: types[blockType], count: count, blocks: blocksCount });
  }

  scripts = [];

  for (const sprite of sp.sprites()) {
    //var stageblocks = sp.stage().blocks();
    console.log(sprite.prop('name'));
    console.log(sprite.prop('comments'));

    var allblocks = sprite.blocks();

    var script = "";

    console.log(sprite.blocks());

    for (const block of sprite.blocks().top()) {
      script += generateScript(block, sprite);
      script += "<br/>";
    }

    scripts.push({ name: sprite.prop('name'), scripts: script });
  }

  console.log(sp.prop());

  res.send({ categories: counts, total: total, scripts: scripts, project: req.params.projectId });
});

app.use('/static', express.static('public'));

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index', {projectId: ("enter project id"), tab: ("analysis") });
});

app.get('/:projectId/:tab?', (req, res) => {
  res.render('index', {projectId: (req.params.projectId || "enter project id"), tab: (req.params.tab || "analysis") });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));