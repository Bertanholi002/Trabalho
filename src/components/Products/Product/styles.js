import { blue } from '@material-ui/core/colors';
import {makeStyles} from '@material-ui/core/styles';

export default makeStyles(()=> ({
    root:{
        maxWidth:'100%'
    },
    media:{
        height:0,
        paddingTop:'76.25%', //16:9
        // borderImageWidth: 50
    },
    cardActions: {
        display:'flex',
        justifyContent:'flex-end',
    },
    cardContent:{
        display:'flex',
        justifyContent:'space-between',
    }
    
}));