import React, {useState, useEffect, useRef} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PlayIcon from '@material-ui/icons/PlayCircleFilledWhite';
import StopIcon from './StopIcon';
import Container from '@material-ui/core/Container';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import BootstrapInput from './BootstrapInput';
import TtsApi from '../../api/google-tts';

const useStyles = makeStyles((theme) => ({
    margin: {
        margin: '1px 8px'
    },
    playIcon: {
        fontSize: 42, 
        cursor: "pointer"
    },
    stopIcon: {
        margin: 4, 
        fontSize: 34, 
        cursor: "pointer", 
        color: "#fff", 
        backgroundColor: "#3f51b5", 
        borderRadius: 45
    }
}));

const API = new TtsApi();

const ControlBar = ({getText}) => {
    const classes = useStyles();
    const [voice, setVoice] = useState(0);
    const [voicesList, setVoicesList] = useState([<MenuItem key="default" value={0}><em>Loading...</em></MenuItem>]);
    const [speed, setSpeed] = useState(1);
    const [stopPlay, setStopPlay] = useState(false);
    const [audioSource, setAudioSource] = useState("");
    const audioEl = useRef(null);

    const handleVoiceChange = (event) => {
        setVoice(event.target.value);
    };

    const handleSpeedChange = (event) => {
        setSpeed(event.target.value);
    };

    const handleEndedPlay = () => {
        setStopPlay(false);
    };

    const handlePlay = async () => {
        setStopPlay(true);
        
        await API.synthesizeSpeech(getText(), voice, speed)
        .then(async (audioContent) => {
            await setAudioSource("data:audio/mpeg;base64," + audioContent);
            audioEl.current.play();
        });
    };

    const handleStop = () => {
        setStopPlay(false);
        audioEl.current.pause();
        setAudioSource(null);
    };

    let PlayBtn = <PlayIcon 
        color="primary" 
        className={classes.playIcon} 
        onClick={handlePlay}
        />;

    if (stopPlay) {
        PlayBtn = <StopIcon 
            color="primary"
            className={classes.stopIcon}
            onClick={handleStop}
            />;
    }
    
    useEffect(() => {
        API.getVoicesList('en-US').then((voices) => {
            const list = voices.map((voice, index) => {
                return <MenuItem key={index} value={voice.name}>{voice.name}</MenuItem>;
            });
            
            setVoicesList(list);
            setVoice('en-US-Standard-B');
        });
    }, []);

    return (
        <Container maxWidth="sm">
            <audio ref={audioEl} src={audioSource} onEnded={handleEndedPlay}/>
            {PlayBtn}
            <FormControl className={classes.margin} style={{minWidth: 150}}>
                <Select
                    id="voice-select"
                    value={voice}
                    onChange={handleVoiceChange}
                    input={<BootstrapInput />}
                    >
                    {voicesList}
                </Select>
            </FormControl>
            <FormControl className={classes.margin}>
                <Select
                    id="speed-select"
                    value={speed}
                    onChange={handleSpeedChange}
                    input={<BootstrapInput />}
                    >
                    <MenuItem value={1}>Speed 1</MenuItem>
                    <MenuItem value={1.5}>Speed 2</MenuItem>
                    <MenuItem value={1.75}>Speed 3</MenuItem>
                    <MenuItem value={2}>Speed 4</MenuItem>
                    <MenuItem value={2.25}>Speed 5</MenuItem>
                </Select>
            </FormControl>
        </Container>
    );
};

export default ControlBar;