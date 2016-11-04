CKEDITOR.plugins.add('helloworld', {
    init: function (editor) {
        var pluginName = 'helloworld';
        CKEDITOR.dialog.add(pluginName, this.path + 'dialogs/helloworld.js');
        editor.addCommand(pluginName, new CKEDITOR.dialogCommand(pluginName));
        editor.ui.addButton(pluginName,
        {
            label: 'Hello',
            command: pluginName
        });
    }
});