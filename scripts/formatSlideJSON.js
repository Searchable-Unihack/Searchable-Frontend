var readDirFiles        = require('../node_modules/read-dir-files');
var jQuery              = require('../node_modules/jquery')
var fs                  = require('fs')
var file_list           = null;
var lecture_slide_array = [];

readDirFiles.list('../lecture_data/lecture-04', function (err, filenames) {
  if (err) return console.dir(err);
  file_list = filenames;

  for (var i=1; i<file_list.length; i++)
  {
    file_list[i] = file_list[i].slice(27);
    var text = fs.readFileSync("../lecture_data/lecture-04/" + file_list[i], 'utf8');
    var timestamp = Number(file_list[i].slice(12,-5)) * 60;

    var response = formatSlideJSON(JSON.parse(text),timestamp);

    if (response != 'nothing')
    {
      lecture_slide_array.push(response);
    }
  }
  console.log(lecture_slide_array);
});

function formatSlideJSON (text,timestamp)
{
  if (text['regions'][0] != undefined)
  {
    var lines = text['regions'][0]['lines'];
    var wordString = '';


    for (var i=0; i<lines.length; i++)
    {
      var sentence = lines[i]['words'];

      for (var j=0; j<sentence.length; j++)
      {
        wordString += sentence[j]['text'] + ' ';
      }
    }
    var returnJSON = {
      "time":	    timestamp,
      "weight":   2,
      "source":   'slide',
      "id":       "3043092d-83bf-47ca-8466-586af288e869",
      "text":	    wordString
    };
    return returnJSON;
  }
  else {
    return 'nothing'
  }
}
