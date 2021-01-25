
const definitions = require('./definitions');
const tipstext = require('./tipstext');
const opcode2sb = definitions.opcode2sb;
const defaults = definitions.opcode2sbdefaults;
const groups = definitions.groups;
const tips = tipstext.tiptext;

const express = require('express');
const app = express();
const port = 3000;

const { loadProjectJson, loadSb3, loadCloudId, BlockCollection, SpriteCollection, Block, ScratchProject, Sprite, Stage, Variable, VariableCollection, CollectionWrapper } = require('sb-util');

// Get the blocks code for a block within a script
function getScriptBlocksCode(next, sprite) {

  console.log(`Generating: ${sprite.prop('name')}`);

  var opcode = next.prop('opcode');
  blockcode = opcode2sb[opcode];

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
function fieldReplace(block, sprite) {

  console.log(`Field replace: ${sprite.prop('name')}: ${block.prop('opcode')}`);

  var blockcode = opcode2sb[block.prop('opcode')];
  console.log(block.prop('opcode'));
  
  var fields = block.prop('fields');
  console.log("Replacing fields");
  console.log(fields);

  for (var i in fields) {
      blockcode = blockcode.replace(`%${fields[i]['name']}%`, fields[i]['value']);
  }

  var inputs = block.prop('inputs');
  
  var comment = getComment(block, sprite);

  if(comment != "")
  {
    comment =  " // " + comment; 

    if(inputs['SUBSTACK'] !== undefined)
      blockcode = blockcode.replace(/\n/, `${comment}\n`);
    else
      blockcode += comment;
  }

  console.log("Replacing inputs");
  console.log(inputs);

  for (var i in inputs) {
    if(inputs[i]['block'] === null)
      continue;

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

  console.log(`blockcode: ${blockcode}`);

  return blockcode;
}

function getComment(block, sprite)
{
  console.log(`Getting comment ${block.prop('id')}`);

  const id = block.prop('id');
  const comments = sprite.prop('comments');
  var text ="";

  for(var comment in comments){
    if(comments[comment]['blockId'] == id)
    {
      text =comments[comment]['text'];
      continue;
    }
  }
  console.log(`Comment: ${text}`);

  return text;
}


var scriptlength = 0;

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

    scriptlength += 1;

  } while (next)

  return script;
}

app.get('/categories/:projectId', async (req, res) => {
  //const sp = await loadProjectJson('455910740.json');
  //const sp = await loadProjectJson('https://projects.scratch.mit.edu/461059643');

  const sp = await loadCloudId(req.params.projectId);
  var longestscript = 0;

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
      scriptlength = 0;
      script += generateScript(block, sprite);
      script += "<br/>";
      
    }

    if (scriptlength > longestscript)
      longestscript = scriptlength;

    scripts.push({ name: sprite.prop('name'), scripts: script });
  }

  assessment = {};

// Hat blocks
  console.log("Hat");
  hatcount = 0;
  const hats = sp.blocks().query(":hat");

  var hatblocks = ""; 

  for (const block of hats) {
    hatcount++;
    if(!hatblocks.includes(defaults[block.prop('opcode')]))
      hatblocks += `<code class="inlineblocks" style="padding-right: 30px;">${defaults[block.prop('opcode')]}</code>`;
  }

// Sequencing
  var spritecount = -1; // Don't count the Stage
  for (const s of sp.sprites())
    spritecount++;

  var scriptcount = 0;
  for (const s of sp.blocks().top())
    scriptcount++;

  var blockcount = 0;
  // Don't count boolean or reporter blocks
  for (const s of sp.blocks().query(":stack"))
    blockcount++;  
  for (const s of sp.blocks().query(":c"))
    blockcount++;
  for (const s of sp.blocks().query(":hat"))
    blockcount++;
  for (const s of sp.blocks().query(":cap"))
    blockcount++;
  // missing from stack blocks    
  for (const s of sp.blocks().query("motion_setrotationstyle"))
    blockcount++;
  for (const s of sp.blocks().query("looks_cleargraphiceffects"))
    blockcount++;
    
// Variables
  var variablecount = Object.keys(sp.stage().prop('variables')).length;

// User interaction
  var interactioncount = 0;
  var interactionblocks = [];
  for (const b in groups['interaction'])
  {
    for (const block of sp.blocks().query(groups['interaction'][b]))
    {  
      // Only include if target is mouse pointer
      if(block.prop('opcode') == 'motion_pointtowards')
      {
        if(sp.blocks().byId(block.prop('inputs')['TOWARDS']['block']).prop('fields')['TOWARDS']['value'].includes('mouse'))
        {
          interactionblocks += `<code class="inlineblocks" style="padding-right: 30px;">${fieldReplace(block, sp)}</code>`;
          interactionblocks = interactionblocks.replace("_mouse_ v", 'mouse-pointer v');
          interactioncount++;
        }
        
        continue;
      }
      if(block.prop('opcode') == 'motion_glideto' || block.prop('opcode') == 'motion_goto')
      {
        if(sp.blocks().byId(block.prop('inputs')['TO']['block']).prop('fields')['TO']['value'].includes('mouse'))
        {
          interactionblocks += `<code class="inlineblocks" style="padding-right: 30px;">${fieldReplace(block, sp)}</code>`;
          interactionblocks = interactionblocks.replace("_mouse_ v", 'mouse-pointer v');
          interactioncount++;
        }
        
        continue;
      }

      if(!interactionblocks.includes(defaults[block.prop('opcode')]))
        interactionblocks += `<code class="inlineblocks" style="padding-right: 30px;">${defaults[block.prop('opcode')]}</code>`;

      interactioncount++;
    }    
  }

// Repetition
  var repetitioncount = 0;
  var repetitionblocks = [];
  for (const b in groups['repetition'])
  {
    for (const block of sp.blocks().query(groups['repetition'][b]))
    {   
      repetitioncount++;

      if(!repetitionblocks.includes(defaults[block.prop('opcode')]))
        repetitionblocks += `<pre style="float:left" class="assessmentblocks" style="padding-right: 30px;">${defaults[block.prop('opcode')]}</pre>`;
    }    
  }

// Conditional 
  var conditionalcount = 0;
  var conditionalblocks = [];
  for (const b in groups['conditional'])
  {
    for (const block of sp.blocks().query(groups['conditional'][b]))
    {   
      conditionalcount++;

      if(!conditionalblocks.includes(defaults[block.prop('opcode')]))
        conditionalblocks += `<pre style="float:left" class="assessmentblocks" style="margin-right: 30px;">${defaults[block.prop('opcode')]}</pre>`;
    }    
  }

  booleancount = 0;
  const boolean = sp.blocks().query(":boolean");

  var booleanblocks = ""; 

  for (const block of boolean) {
    booleancount++;
    if(!booleanblocks.includes(defaults[block.prop('opcode')]))
      booleanblocks += `<code class="inlineblocks" style="padding-right: 30px;">${defaults[block.prop('opcode')]}</code>`;
  }

  assessment["stats"] = { section: 'stats', spritecount: spritecount, scriptcount: scriptcount, blockcount: blockcount};

  assessment["hat"] = { section: 'hat', count: hatcount, blocks: hatblocks};

  assessment["sequencing"] = { section: 'sequencing', longest: longestscript, tip: tips['long_scripts']};

  assessment["interaction"] = { section: 'interaction', count: interactioncount, blocks: interactionblocks, tip: ""};

  assessment["repetition"] = { section: 'repetition', count: repetitioncount, blocks: repetitionblocks, tip: ""};

  assessment["variables"] = { section: 'variables', count: variablecount, tip: ""};

  assessment["conditional"] = { section: 'conditional', count: conditionalcount, blocks: conditionalblocks, booleancount: booleancount, booleanblocks: booleanblocks, tip: ""};

  res.send({ categories: counts, total: total, scripts: scripts, project: req.params.projectId, assessment: assessment });
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