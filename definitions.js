// Adapted from https://github.com/LLK/scratch-vm/blob/develop/src/blocks/
// and https://github.com/scratchblocks/scratchblocks/blob/master/tests/all-blocks.txt
module.exports.opcode2sb = {
  motion_movesteps: 'move %STEPS% steps',
  motion_gotoxy: 'go to x: %X% y: %Y%',
  motion_goto: 'go to %TO%',
  motion_turnright: 'turn right %DEGREES% degrees',
  motion_turnleft: 'turn left %DEGREES% degrees',
  motion_pointindirection: 'point in direction %DIRECTION%',
  motion_pointtowards: 'point towards %TOWARDS%',
  motion_glidesecstoxy: 'glide %SECS% secs to x: %X% y: %Y%',
  motion_glideto: 'glide %SECS% secs to %TO%',
  motion_ifonedgebounce: 'if on edge, bounce',
  motion_setrotationstyle: 'set rotation style [%STYLE% v]',
  motion_changexby: 'change x by %DX%',
  motion_setx: 'set x to %X%',
  motion_changeyby: 'change y by  %DY%',
  motion_sety: 'set y to %Y%',
  motion_xposition: '(x position)',
  motion_yposition: '(y position)',
  motion_direction: '(direction)',
  looks_say: 'say %MESSAGE%',
  looks_sayforsecs: 'say %MESSAGE% for %SECS% secs',
  looks_think: 'think %MESSAGE%',
  looks_thinkforsecs: 'think %MESSAGE% for %SECS% secs',
  looks_show: 'show',
  looks_hide: 'hide',
  looks_switchcostumeto: 'switch costume to %COSTUME%',
  looks_switchbackdropto: 'switch backdrop to %BACKDROP%',
  looks_switchbackdroptoandwait: 'switch backdrop to %BACKDROP% and wait',
  looks_nextcostume: 'next costume',
  looks_nextbackdrop: 'next backdrop',
  looks_changeeffectby: 'change [%EFFECT% v]effect by %CHANGE%',
  looks_seteffectto: 'set [%EFFECT% v] effect to %VALUE%',
  looks_cleargraphiceffects: 'clear graphic effects',
  looks_changesizeby: 'change size by %CHANGE%',
  looks_setsizeto: 'set size to %SIZE% %',
  looks_gotofrontback: 'go to [%FRONT_BACK% v] layer',
  looks_goforwardbackwardlayers: 'go [%FORWARD_BACKWARD% v] %NUM% layers',
  looks_size: '(size)',
  looks_costumenumbername: '(costume [%NUMBER_NAME% v])',
  looks_backdropnumbername: '(backdrop [%NUMBER_NAME% v])',
  sound_play: 'start sound %SOUND_MENU%',
  sound_playuntildone: 'play sound %SOUND_MENU% until done',
  sound_stopallsounds: 'stop all sounds',
  sound_seteffectto: 'set [%EFFECT% v] effect to %VALUE%',
  sound_changeeffectby: 'change [%EFFECT% v] effect by %VALUE%',
  sound_cleareffects: 'clear sound effects',
  sound_setvolumeto: 'set volume to %VOLUME% %',
  sound_changevolumeby: 'change volume by %VOLUME%',
  sound_volume: '(volume)',
  event_whenflagclicked: 'when flag clicked',
  event_whenkeypressed: 'when [%KEY_OPTION% v] key pressed',
  event_whenthisspriteclicked: 'when this sprite clicked',
  event_whenstageclicked: 'when stage clicked',
  event_whenbackdropswitchesto: 'when backdrop switches to [%BACKDROP% v]',
  event_whengreaterthan: 'when [%WHENGREATERTHANMENU% v] > %VALUE%',
  event_whenbroadcastreceived: 'when I receive [%BROADCAST_OPTION% v]',
  event_broadcast: 'broadcast %BROADCAST_INPUT%',
  event_broadcastandwait: 'broadcast %BROADCAST_INPUT% and wait',
  control_repeat: `repeat %TIMES%\n%SUBSTACK%end`,
  control_repeat_until: `repeat until %CONDITION%\n%SUBSTACK%end`,
  // control_while: this.repeatWhile,
  // control_for_each: this.forEach, 
  control_forever: `forever\n%SUBSTACK%end`,
  control_wait: 'wait %DURATION% secs',
  control_wait_until: `wait until %CONDITION%`,
  control_if: `if %CONDITION% then\n%SUBSTACK%end`,
  control_if_else: `if %CONDITION% then\n%SUBSTACK%else\n%SUBSTACK2%end`,
  control_stop: 'stop [%STOP_OPTION% v]',
  control_create_clone_of: 'create clone of %CLONE_OPTION%',
  control_delete_this_clone: 'delete this clone',
  //control_get_counter: this.getCounter,
  //control_incr_counter: this.incrCounter,
  //control_clear_counter: this.clearCounter,
  //control_all_at_once: this.allAtOnce,
  control_start_as_clone: 'when I start as a clone',
  sensing_touchingobject: '&lt;touching %TOUCHINGOBJECTMENU% ?&gt;',
  sensing_touchingcolor: '&lt;touching color %COLOR% ?&gt;',
  sensing_coloristouchingcolor: '&lt;color %COLOR% is touching %COLOR2% ?&gt;',
  sensing_distanceto: '(distance to %DISTANCETOMENU%)',
  sensing_timer: '(timer)',
  sensing_resettimer: 'reset timer',
  sensing_of: '([%PROPERTY% v] of %OBJECT%)',
  sensing_mousex: '(mouse x)',
  sensing_mousey: '(mouse y)',
  sensing_setdragmode: 'set drag mode [%DRAG_MODE% v]',
  sensing_mousedown: '&lt;mouse down?&gt;',
  sensing_keypressed: '&lt;key %KEY_OPTION% pressed?&gt;',
  sensing_current: '(current [%CURRENTMENU% v])',
  sensing_dayssince2000: '(days since 2000)',
  sensing_loudness: '(loudness)',
  sensing_askandwait: 'ask %QUESTION% and wait',
  sensing_answer: '(answer)',
  sensing_username: '(username)',
  operator_add: '(%NUM1% + %NUM2%)',
  operator_subtract: '(%NUM1% - %NUM2%)',
  operator_multiply: '(%NUM1% * %NUM2%)',
  operator_divide: '(%NUM1% / %NUM2%)',
  operator_lt: '<%OPERAND1% < %OPERAND2%>',
  operator_equals: '<%OPERAND1% = %OPERAND2%>',
  operator_gt: '<%OPERAND1% > %OPERAND2%>',
  operator_and: '<%OPERAND1% and %OPERAND2%>',
  operator_or: '<%OPERAND1% or %OPERAND2%>',
  operator_not: `&lt;not %OPERAND% &gt;`,
  operator_random: '(pick random %FROM% to %TO%)',
  operator_join: '(join %STRING1% %STRING2%)',
  operator_letter_of: '(letter %LETTER% of %STRING%)',
  operator_length: '(length of %STRING%)',
  operator_contains: '&lt;%STRING1% contains %STRING2%&gt;',
  operator_mod: '(%NUM1% mod %NUM2%)',
  operator_round: '(round %NUM%)',
  operator_mathop: '([%OPERATOR% v] of %NUM%)',
  data_variable: '(%VARIABLE%)',
  data_setvariableto: 'set [%VARIABLE% v] to %VALUE%',
  data_changevariableby: 'change [%VARIABLE% v] by %VALUE%',
  data_hidevariable: 'hide variable [%VARIABLE% v]',
  data_showvariable: 'show variable [%VARIABLE% v]',
  data_listcontents: '(%LIST% :: list :: reporter)',
  data_addtolist: 'add %ITEM% to [%LIST% v]',
  data_deleteoflist: 'delete %INDEX% of [%LIST% v]',
  data_deletealloflist: 'delete all of [%LIST% v]',
  data_insertatlist: 'insert %ITEM% at %INDEX% of [%LIST% v]',
  data_replaceitemoflist: 'replace item %INDEX% of [%LIST% v] with %ITEM%',
  data_itemoflist: '(item %INDEX% of [%LIST% v])',
  data_itemnumoflist: '(item # of %ITEM% in [%LIST% v])',
  data_lengthoflist: '(length of [%LIST% v])',
  data_listcontainsitem: '<[%LIST% v] contains %ITEM%>',
  data_hidelist: 'hide list [%LIST% v]',
  data_showlist: 'show list [%LIST% v]',
  procedures_definition: 'define %PROCCODE%',
  procedures_call: '%PROCCODE% :: custom',
  pen_clear: 'erase all',
  pen_stamp: 'stamp',
  pen_penDown: 'pen down',
  pen_penUp: 'pen up',
  pen_setPenColorToColor: 'set pen color to %COLOR%',
  pen_changePenSizeBy: 'change pen size by %SIZE%',
  pen_setPenSizeTo: 'set pen size to %SIZE%',
  pen_changePenColorParamBy: 'change pen %COLOR_PARAM% by %VALUE%',
  pen_setPenColorParamTo: 'set pen %COLOR_PARAM% to %VALUE%',
  music_getTempo: 'tempo',
  music_restForBeats: 'rest for %BEATS% beats',
  music_setTempo: 'set tempo to %TEMPO%',
  music_changeTempo: 'change tempo by %TEMPO%',
  music_playNoteForBeats: 'play note %NOTE% for %BEATS% beats',
  music_setInstrument: 'set instrument to %INSTRUMENT%',
  music_playDrumForBeats: `play drum %DRUM% for %BEATS% beats`,
  videoSensing_whenMotionGreaterThan: 'when video motion > %REFERENCE%',
  videoSensing_setVideoTransparency: 'set video transparency to %TRANSPARENCY%',
  videoSensing_videoToggle: 'turn video %VIDEO_STATE%',
  videoSensing_videoOn: 'video %ATTRIBUTE% on %SUBJECT%',
  text2speech_speakAndWait: 'speak %WORDS% :: tts',
  text2speech_setVoice: 'set voice to %VOICE% :: tts',
  text2speech_setLanguage: 'set language to %LANGUAGE% :: tts',
  translate_getTranslate: '(translate %WORDS% to %LANGUAGE% :: translate)',
  translate_getViewerLanguage: '(language :: translate)',
  text: '[%TEXT%]',
  math_number: '[%NUM%]',
  math_integer: '[%NUM%]',
  math_positive_number: '[%NUM%]',
  math_whole_number: '[%NUM%]',
  math_angle: '[%NUM%]',
  note: '(%NOTE%)',
  sound_sounds_menu: '[%SOUND_MENU% v]',
  motion_goto_menu:'(%TO% v)',
  motion_glideto_menu:'(%TO% v)',
  motion_pointtowards_menu: '(%TOWARDS% v)',
  event_broadcast_menu: '[%BROADCAST_OPTION% v]',
  control_create_clone_of_menu: '[%CLONE_OPTION% v]',
  sensing_distancetomenu: '[%DISTANCETOMENU% v]',
  sensing_touchingobjectmenu: '[%TOUCHINGOBJECTMENU% v]',
  sensing_keyoptions: '(%KEY_OPTION% v)',
  colour_picker: '(%COLOUR%)',
  sensing_of_object_menu: '[%OBJECT% v]',
  pen_menu_colorParam: '(%colorParam% v)',
  music_menu_INSTRUMENT:'(%INSTRUMENT% v)',
  music_menu_DRUM: '(%DRUM% v)',
  videoSensing_menu_VIDEO_STATE: '(%VIDEO_STATE% v)',
  videoSensing_menu_ATTRIBUTE: '(%ATTRIBUTE% v)',
  videoSensing_menu_SUBJECT: '(%SUBJECT% v)',
  text2speech_menu_languages: '(%languages% v)',
  translate_menu_languages: '(%languages% v)',
  text2speech_menu_voices: '(%voices% v)',
  looks_backdrops: '[%BACKDROP% v]',
  looks_costume: '[%COSTUME% v]',
  argument_reporter_string_number: '(%VALUE% :: reporter :: custom)'
}; 

 module.exports.opcode2sbdefaults = {
  motion_movesteps: 'move (10) steps',
  motion_gotoxy: 'go to x: (0) y: (0)',
  motion_goto: 'go to (random position v)',
  motion_turnright: 'turn right (15) degrees',
  motion_turnleft: 'turn left (15) degrees',
  motion_pointindirection: 'point in direction (90 v)',
  motion_pointtowards: 'point towards (mouse-pointer v)',
  motion_glidesecstoxy: 'glide (1) secs to x: (0) y: (0)',
  motion_glideto: 'glide (1) secs to (random position v)',
  motion_ifonedgebounce: 'if on edge, bounce',
  motion_setrotationstyle: 'set rotation style [left-right v]',
  motion_changexby: 'change x by (10)',
  motion_setx: 'set x to (0)',
  motion_changeyby: 'change y by (10)',
  motion_sety: 'set y to (0)',
  motion_xposition: '(x position)',
  motion_yposition: '(y position)',
  motion_direction: '(direction)',
  looks_say: ' say [Hello!]',
  looks_sayforsecs: 'say [Hello!] for (2) secs',
  looks_think: 'think [Hmm...]',
  looks_thinkforsecs: 'think [Hmm...] for (2) secs',
  looks_show: 'show',
  looks_hide: 'hide',
  looks_switchcostumeto: 'switch costume to [costume1 v]',
  looks_switchbackdropto: 'switch backdrop to [backdrop1 v]',
  looks_switchbackdroptoandwait: 'switch backdrop to [backdrop1 v] and wait',
  looks_nextcostume: 'next costume',
  looks_nextbackdrop: 'next backdrop',
  looks_changeeffectby: 'change [color v] effect by (25)',
  looks_seteffectto: 'set [color v] effect to (0)',
  looks_cleargraphiceffects: 'clear graphic effects',
  looks_changesizeby: 'change size by (10)',
  looks_setsizeto: 'set size to (100)%',
  looks_gotofrontback: 'go to front',
  looks_goforwardbackwardlayers: 'go back (1) layers',
  looks_size: '(size)',
  looks_costumenumbername: '(costume [number v])',
  looks_backdropnumbername: '(backdrop [number v])',
  sound_play: 'start sound [pop v]',
  sound_playuntildone: 'play sound [pop v] until done',
  sound_stopallsounds: 'stop all sounds',
  sound_seteffectto: 'set [pitch v] effect to (100)',
  sound_changeeffectby: 'change [pitch v] effect by (10)',
  sound_cleareffects: 'clear sound effects',
  sound_setvolumeto: 'set volume to (100)%',
  sound_changevolumeby: 'change volume by (-10)',
  sound_volume: '(volume)',
  event_whenflagclicked: 'when flag clicked',
  event_whenkeypressed: 'when [space v] key pressed',
  event_whenthisspriteclicked: 'when this sprite clicked',
  event_whenstageclicked: 'when stage clicked',
  event_whenbackdropswitchesto: 'when backdrop switches to [backdrop1 v]',
  event_whengreaterthan: 'when [loudness v] > (10)',
  event_whenbroadcastreceived: 'when I receive [message1 v]',
  event_broadcast: 'broadcast [message1 v]',
  event_broadcastandwait: 'broadcast [message1 v] and wait',
  control_repeat: 'repeat (10)',
  control_repeat_until: 'repeat until <>',
  // control_while: this.repeatWhile,
  // control_for_each: this.forEach, 
  control_forever: 'forever',
  control_wait: 'wait (1) secs',
  control_wait_until: 'wait until <>',
  control_if: 'if <> then',
  control_if_else: `if <> then
  else
  end`,
  control_stop: 'stop [all v]',
  control_create_clone_of: 'create clone of [myself v]',
  control_delete_this_clone: 'delete this clone',
  //control_get_counter: this.getCounter,
  //control_incr_counter: this.incrCounter,
  //control_clear_counter: this.clearCounter,
  //control_all_at_once: this.allAtOnce,
  control_start_as_clone: 'when I start as a clone',
  sensing_touchingobject: '&lt;touching [mouse-pointer v]?&gt;',
  sensing_touchingcolor: '&lt;touching color [#f0f]?&gt;',
  sensing_coloristouchingcolor: '&lt;color [#f0f] is touching [#0f0]?&gt;',
  sensing_distanceto: '(distance to [mouse-pointer v])',
  sensing_timer: '(timer)',
  sensing_resettimer: 'reset timer',
  sensing_of: '([backdrop # v] of [Stage v])',
  sensing_mousex: '(mouse x)',
  sensing_mousey: '(mouse y)',
  sensing_setdragmode: 'set drag mode [draggable v]',
  sensing_mousedown: '&lt;mouse down?&gt;',
  sensing_keypressed: '&lt;key [space v] pressed?&gt;',
  sensing_current: '(current [minute v])',
  sensing_dayssince2000: '(days since 2000)',
  sensing_loudness: '(loudness)',
  sensing_askandwait: 'ask [name?] and wait',
  sensing_answer: '(answer)',
  sensing_username: '(username)',
  operator_add: '(() + ())',
  operator_subtract: '(() - ())',
  operator_multiply: '(() * ())',
  operator_divide: '(() / ())',
  operator_lt: '<[] < []>',
  operator_equals: '<[] = []>',
  operator_gt: '<[] > []>',
  operator_and: '<<> and <>>',
  operator_or: '<<> or <>>',
  operator_not: '&lt;not <>&gt;',
  operator_random: '(pick random (1) to (10))',
  operator_join: '(join [apple ] [banana])',
  operator_letter_of: '(letter (1) of [apple])',
  operator_length: '(length of [apple])',
  operator_contains: '&lt;[apple] contains [a]&gt;',
  operator_mod: '(() mod ())',
  operator_round: '(round ())',
  operator_mathop: '([sqrt v] of (9))',
  data_variable: '(my variable)',
  data_setvariableto: 'set [my variable v] to [0]',
  data_changevariableby: 'change [my variable v] by (1)',
  data_hidevariable: 'hide variable [my variable v]',
  data_showvariable: 'show variable [my variable v]',
  data_listcontents: 'my list :: list :: reporter',
  data_addtolist: 'delete all of [my list v]',
  data_deleteoflist: 'delete (1 v) of [my list v]',
  data_deletealloflist: 'insert [thing] at (1 v) of [my list v]',
  data_insertatlist: 'insert [thing] at (1 v) of [my list v]',
  data_replaceitemoflist: 'replace item (1 v) of [my list v] with [thing]',
  data_itemoflist: '(item (1 v) of [my list v])',
  data_itemnumoflist: '(item (1 v) of [my list v])',
  data_lengthoflist: '(length of [my list v])',
  data_listcontainsitem: '<[my list v] contains [thing]>',
  data_hidelist: 'hide list [my list v]',
  data_showlist: 'show list [my list v]',
  procedures_definition: 'define my block',
  procedures_call: 'my block :: custom',
  pen_clear: 'erase all',
  pen_stamp: 'stamp',
  pen_penDown: 'pen down',
  pen_penUp: 'pen up',
  pen_setPenColorToColor: 'set pen color to [#0fa073]',
  pen_changePenSizeBy: 'change pen size by [10]',
  pen_setPenSizeTo: 'set pen size to [50]',
  pen_changePenColorParamBy: 'change pen (color v) by [10]',
  pen_setPenColorParamTo: 'set pen (color v) to [50]',
  music_getTempo: 'tempo',
  music_restForBeats: 'rest for [0.25] beats',
  music_setTempo: 'set tempo to [60]',
  music_changeTempo: 'change tempo by [20]',
  music_playNoteForBeats: 'play note (60) for [0.25] beats',
  music_setInstrument: `set instrument to (\\(1\\) Piano v)`,
  music_playDrumForBeats: `play drum (\\(1\\) Snare Drum v) for [0.25] beats`,
  videoSensing_whenMotionGreaterThan: 'when video motion > [10]',
  videoSensing_setVideoTransparency: 'set video transparency to [50]',
  videoSensing_videoToggle: 'turn video (on v)',
  videoSensing_videoOn: 'video (motion v) on (sprite v)',
  text2speech_speakAndWait: 'speak [Hello] :: tts',
  text2speech_setVoice: 'set voice to (alto v) :: tts',
  text2speech_setLanguage: 'set language to (English v) :: tts',
  translate_getTranslate: '(translate %WORDS% to (English v) :: translate)',
  translate_getViewerLanguage: '(language :: translate)'
 };