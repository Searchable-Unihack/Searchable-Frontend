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
  for (var i=1; i<lecture_slide_array.length; i++)
  {
    if (lecture_slide_array[i-1]['text'] == lecture_slide_array[i]['text'])
    {
      var index1;
      var index2;

      index1 = lecture_slide_array.splice(i, lecture_slide_array.length);
      index2 = lecture_slide_array.splice(0, i-1);
      lecture_slide_array  = index2.concat(index1);
      i--;
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
      "id":       "5dc1b12e-bbeb-4565-831b-9d7da8ad2141",
      "text":	    wordString
    };
    return returnJSON;
  }
  else {
    return 'nothing'
  }
}
