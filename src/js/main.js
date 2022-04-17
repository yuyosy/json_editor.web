// main.js

// https://github.com/json-editor/json-editor
JSONEditor.defaults.theme = 'spectre';
JSONEditor.defaults.iconlib = 'spectre';

const element = document.getElementById('editor_holder');

const jseditor = new JSONEditor(element, {
    schema: schema
});


// https://github.com/json-editor/json-editor/wiki/Adding-a-SaveAsFile-button
jseditor.on('ready', function() {
    var button = jseditor.root.getButton('Save Result As File', 'save', 'Save Result As File'),
    button_holder = jseditor.root.theme.getHeaderButtonHolder();
    button_holder.appendChild(button);
    jseditor.root.header.parentNode.insertBefore(button_holder, jseditor.root.header.nextSibling);
  
    button.addEventListener('click', function(e) {
      e.preventDefault();
      var example = jseditor.getValue(),
      filename = 'data.json',
      blob = new Blob([JSON.stringify(example, null, 2)], {
        type: "application/json;charset=utf-8"
      });
  
      if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveOrOpenBlob(blob, filename);
      } else {
        var a = document.createElement('a');
        a.download = filename;
        a.href = URL.createObjectURL(blob);
        a.dataset.downloadurl = ['text/plain', a.download, a.href].join(':');
  
        a.dispatchEvent(new MouseEvent('click', {
          'view': window,
          'bubbles': true,
          'cancelable': true
        }));
      }
    }, false);
  });