



/* ---------- ---------- ---------- ---------- ---------- ---------- */
/* Source arrays */
/* ---------- ---------- ---------- ---------- ---------- ---------- */


/* Most common syllabes in English language */

var syllabes = [
'the','ing','er','a','ly','ed','i','es','re','tion','in','e','con','y','ter','ex','al','de','com','o','di','en','an','ty','ry','u',
'ti','ri','be','per','to','pro','ac','ad','ar','ers','ment','or','tions','ble','der','ma','na','si','un','at','dis','ca','cal','man','ap',
'po','sion','vi','el','est','la','lar','pa','ture','for','is','mer','pe','ra','so','ta','as','col','fi','ful','get','low','ni','par','son',
'tle','day','ny','pen','pre','tive','car','ci','mo','an','aus','pi','se','ten','tor','ver','ber','can','dy','et','it','mu','no','ple','cu',
'fac','fer','gen','ic','land','light','ob','of','pos','tain','den','ings','mag','ments','set','some','sub','sur','ters','tu','af','au','cy','fa','im',
'li','lo','men','min','mon','op','out','rec','ro','sen','side','tal','tic','ties','ward','age','ba','but','cit','cle','co','cov','daq','dif','ence',
'ern','eve','hap','ies','ket','lec','main','mar','mis','my','nal','ness','ning','nu','oc','pres','sup','te','ted','tem','tin','tri','tro','up',
];

var syllabesLength = syllabes.length;

/* Popular names in several English-speaking countries */

var names = [
'Abigail','Alice','Amelia','Angelina','Ann',
'Ashley','Avery','Barbara','Brianna','Camila',
'Chloe','Dorothy','Elizabeth','Ella','Emily',
'Emma','Fiona','Florence','Gabrielle','Haley',
'Hannah','Isabella','Jasmine','Jennifer','Jessica',
'Juliette','Kate','Leah','Lily','Linda',
'Lea','Madison','Makayla','Margaret','Maria',
'Mariana','Mary','Megan','Mia','Olivia',
'Patricia','Rachel','Samantha','Sarah','Sophie',
'Susan','Taylor','Valeria','Victoria','Zoe',
'Alexander','Anthony','Benjamin','Brandon','Carter',
'Charles','Charlie','Christian','Christopher','Daniel',
'David','Deven','Dylan','Elijah','Eric',
'Ethan','Felix','Gabriel','George','Harry',
'Hudson','Hunter','Jack','Jacob','James',
'Jason','Jayden','Jeremiah','John','Joseph',
'Joshua','Justin','Kevin','Liam','Logan',
'Lucas','Matthew','Michael','Neil','Noah',
'Oliver','Owen','Raphael','Richard','Robert',
'Ryan','Samuel','Thomas','Tyler','William'
];

/* Sample colors */
/* TODO: Split them to several palettes and allow choice of which palettes to use, ie. warm, cool, grays, greens, etc. */

var colors = [
'antiquewhite', 'brown', 'chocolate', 'coral', 'crimson',
'darkgray', 'darkred', 'darkorange', 'darksalmon',
'firebrick', 'floralwhite', 'gainsboro', 'gold', 'goldenrod',
'gray', 'indianred', 'khaki', 'lightcoral', 'lightsalmon', 'lightyellow',
'maroon', 'mistyrose', 'navajowhite', 'mocassin', 'orange', 'orangered',
'peru', 'red', 'rosybrown', 'saddlebrown', 'sandybrown', 'sienna',
'silver', 'slategray', 'tan', 'tomato', 'yeal', 'navy', 'black',
];


var namesLength = names.length;

/* Domain suffixes */

var domains = [
'.net', '.org', '.edu', '.com',
'.com', '.com', '.com', '.com',
];

/* Frequency table for word lengths */

var wordLengths = [
1, 1,
2, 2, 2, 2, 2, 2, 2,
3, 3, 3, 3,
4, 4,
5
];

/* Frequency table for random syllabes */

var syllabeCounts = [
10,
15,
20,
25,

30,
35,
40,
45,

50,
75,
100,
125,

150,
175,
175,
175,
];



/* ---------- ---------- ---------- ---------- ---------- ---------- */
/* Utility methods */
/* ---------- ---------- ---------- ---------- ---------- ---------- */


var capitalize = function(str) {
  return str.slice(0,1).toUpperCase() + str.slice(1).toLowerCase();
};

var getName = function() {
  return names[Math.floor(Math.random() * namesLength)];
};

var getWord = function(min, max) {
  var length = wordLengths[Math.floor(Math.random() * 16)];
  if(min && (length < min)) length = min;
  if(max && (length > max)) length = max;
  var word = '';
  for(var i = 0; i < length; ++i) {
    var count = syllabeCounts[Math.floor(Math.random() * 16)];
    word += syllabes[Math.floor(Math.random() * count)];
  }
  return word;
};

var getDomain = function() {
  return getWord(2) + domains[Math.floor(Math.random() * 8)];
};

var randomElement = function(array) {
  return array[Math.floor(Math.random() * array.length)];
};

var randomString = function(min,max){
  return Math.random().toString(36).substr(2, Math.floor(Math.random()*(max-min+1))+min);
};

var attachUserField = {

  name: function(u, o) {
    o.name = u.name;
  },

  surname: function(u, o) {
    o.surname = u.surname;
  },

  fullname: function(u, o) {
    o.fullname = u.name + ' ' + u.surname;
  },

  email: function(u, o) {
    o.email = (u.name + '@' + u.domain).toLowerCase();
  },

  username: function(u, o) {
    o.username = (u.name + '@' + u.domain).toLowerCase();
  },

  'emails.address': function(u, o) {
    o.emails = [
    {address: (u.name + '@' + u.domain).toLowerCase(), validated: false}
    ];
  },

  'profile.name': function(u, o) {
    o.profile = {
      name: u.name + ' ' + u.surname,
    };
  },

};

var defaultUserFields = ['name', 'surname', 'fullname', 'email'];

/* ---------- ---------- ---------- ---------- ---------- ---------- */
/* Exported methods */
/* ---------- ---------- ---------- ---------- ---------- ---------- */


Fake = {};



Fake.user = function(params) {
  var fields;

  if(params && params.fields) {
    fields = params.fields;
  } else {
    fields = defaultUserFields;
  }

  var user = {
    name: getName(),
    surname: capitalize(getWord(3)),
    domain: getDomain(),
  };

  var result = {};

  for(var i in fields) {
    if(attachUserField[fields[i]])
      attachUserField[fields[i]](user, result);
    }

    return result;
  };

  Fake.word = function() {
    var result = getWord();
    result = result.slice(0,1).toUpperCase() + result.slice(1).toLowerCase();;
    return result;
  };

  Fake.sentence = function(length) {
    if(!length) {
      var length = 4 + Math.floor(Math.random() * 8);
    }
    var ending = (Math.random() < 0.95) ? '.' : (Math.random() < 0.5) ? '!' : '?';
    var result = getWord();
    result = result.slice(0,1).toUpperCase() + result.slice(1).toLowerCase();
    for(var i = 1; i < length; ++i) {
      result += ' ' + getWord();
    }
    return result + ending;
  };


  Fake.paragraph = function(length) {
    if(!length) {
      length = 6 + Math.floor(Math.random() * 8);
    }
    var result = Fake.sentence();
    for(var i = 1; i < length; ++i) {
      result += ' ' + Fake.sentence();
    }
    return result;
  };



  Fake.fromArray = function(array) {
    return randomElement(array);
  };

  Fake.color = function() {
    return randomElement(colors);
  };

  Fake.doc = function(schema, options, begining){
    if(!(schema instanceof SimpleSchema)) throw new Meteor.Error('cant generate fake doc', schema + ' isnt SimpleSchema instance');
    options = options || {};
    begining = begining || '';
    skipReminder  = {};

    var reminder,result = {};
    var keys = _.filter(schema._schemaKeys,function(key){return key.indexOf(begining) === 0});

    _.each(keys, function(key){
      var path = begining;
      path = path.substring(0, path.length - 1);
      if(begining) key = key.replace(begining, '');
      var fields = key.split('.');
      var breakCheck = false;
      reminder = result;
      _.each(fields,function(field,index){
        if(field === '$' || breakCheck){
          breakCheck = true;
          return;
        }
        path = path ? path +'.'+field : path+field;
        //optional fields skipper
        if(!options.setOptionalFields && schema._schema[path].optional && skipReminder[path] === undefined){
          var skip =(options.setOptionalFields === false) ? true : Math.floor(2*Math.random());
          skipReminder[path] = skip;
          if(skip){breakCheck = true; return};
        }
        if(skipReminder[path]){breakCheck = true;  return };
        if(!reminder[field]){
          if( fields[index+1] !== '$'){
            reminder[field] = {}
          }
        }else if(fields[index+1] === '$'){
          reminder[field] = []
        }
        reminder = reminder[field];
      });
    });

    _.each(keys, function(key){
      if(begining) key = key.replace(begining, '');
      var path = begining;
      path = path.substring(0, path.length - 1);
      var current = result;
      var fields = key.split('.');
      var breakCheck = false;
      _.each(fields,function(field){
        if(field === "$" || breakCheck){
          breakCheck = true;
          return;
        }
        path = path ? path +'.'+field : path+field;
        current = current[field];
        if(current){
          if(current instanceof Array && current.length === 0){
            assign(result,key, fakeArray(schema,path,options));
          }else if(Object.keys(current).length === 0){
            assign(result,key, fakeValue(schema._schema[path],options));
          }
        }else{
          breakCheck = true;
        }
      });
    });
    return result;
  };

  function assign(obj, prop, value) {
  if (typeof prop === "string")
    prop = prop.split(".");
    if (prop.length > 1) {
      var e = prop.shift();
      assign(obj[e] =
        Object.prototype.toString.call(obj[e]) === "[object Object]"
        ? obj[e]
        : {},
        prop,
        value);
      } else {
          obj[prop[0]] = value;
      }
  }

  function fakeArray(schema,path,options){

    var pattern     = schema._schema[path+'.$'],
    minCount    = pattern.minCount || 1,
    maxCount    = pattern.maxCount || 10,
    arrayLength = Math.floor((Math.random() * (1+maxCount-minCount)) + minCount),
    result      = [];

    if(typeof pattern.type() === 'object'){
      for(var i = 0 ; i < arrayLength ; i++){
        result.push(Fake.doc(schema, options,path+'.$.'));
      }
    }else{
      for(var i=0 ; i < arrayLength ; i++){
        result.push(fakeValue(pattern, options));
      }
    }
    return result;
  }

  function fakeValue(pattern,options){
    options = options || {};
    var min = pattern.min ,
    max = pattern.max;

    if(options.defaultValues && pattern.defaultValue){
      return defaultValue;
    }


    switch(typeof pattern.type()){
      case 'number' :
        max = max ? max : 100;
        min = min ? min : 1;
        return Math.floor((Math.random() * max) + min);
      case 'string' :
        max = max ? max : 10;
        min = min ? min : 3;
        return randomString(min,max);
      case 'boolean' :
        return (Math.floor((Math.random() * 2) + 1) == 1 ? true : false) ;
    }
  };
