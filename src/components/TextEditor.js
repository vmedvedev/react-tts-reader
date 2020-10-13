import React, { PureComponent} from 'react';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';

class TextEditor extends PureComponent {
    constructor(props) {
        super(props);
        this.inputEl = React.createRef();
    }

    getText() {
        return this.inputEl.current.firstChild.firstChild.value;
    }

    render() {
        const onClick = () => {
            this.inputEl.current.firstChild.firstChild.focus();
        };

        return (
            <Paper className="TextEditor-container" elevation={6} onClick={onClick}>
                <Toolbar className="TextEditor-toolbar">
                    <IconButton>
                        <Icon>content_paste</Icon>
                    </IconButton>
                    <IconButton>
                        <Icon>zoom_out</Icon>
                    </IconButton>
                    <IconButton>
                        <Icon>zoom_in</Icon>
                    </IconButton>
                    <IconButton>
                        <Icon>clear</Icon>
                    </IconButton>
                </Toolbar>
                <TextField InputProps={{disableUnderline: true}} ref={this.inputEl} className="TextEditor-field"
                    multiline
                    defaultValue=""
                    fullWidth
                    />
            </Paper>
        );
    }
};

export default TextEditor;