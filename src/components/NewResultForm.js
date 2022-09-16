import { useEffect, useState } from "react";
import TextField from '../../node_modules/@mui/material/TextField/TextField';
import Button from '../../node_modules/@mui/material/Button/Button';
import FormLabel from '../../node_modules/@mui/material/FormLabel/FormLabel';
import RadioGroup from '../../node_modules/@mui/material/RadioGroup/RadioGroup';
import Radio from '../../node_modules/@mui/material/Radio/Radio';
import FormControlLabel from '../../node_modules/@mui/material/FormControlLabel/FormControlLabel';

import { addNewResult } from '../WebClient';

function NewResultForm() {
    const [patientRef, setPatientRef] = useState("");
    const [lotId, setLotId] = useState("");
    const [result, setResult] = useState(true);

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(patientRef);
        console.log(lotId);
        console.log(result);
        await addNewResult(patientRef, lotId, result).then(result => {
            console.log(result);
            setPatientRef(null);
            setLotId(null);
        }).catch(err => {
            console.log(err);
        });
    }

    useEffect(() => {

    }, []);

    return (
        <div>
            <form onSubmit={e => { e.preventDefault(); }}>
                <br />
                <br />
                <TextField
                    required
                    label="Référence du patient"
                    variant="outlined"
                    value={patientRef} onChange={(e => setPatientRef(e.target.value))}
                />
                <br />
                <br />
                <TextField
                    required
                    label="Numéro du lot"
                    variant="outlined"
                    value={lotId} onChange={(e => setLotId(e.target.value))}
                />
                <br />
                <br />  
                <FormLabel id="result-group-label">Résultat</FormLabel>
                <RadioGroup
                    aria-labelledby="result-group-label"
                    defaultValue={true}
                >
                    <FormControlLabel value={true} control={<Radio />} label="Marche" onChange={(_ => setResult(true))} />
                    <FormControlLabel value={false} control={<Radio />} label="Marche pas" onChange={(_ => setResult(false))} />
                </RadioGroup>
                <br />
                <br />
                <Button variant="contained" onClick={handleSubmit}>Valider</Button>
            </form>
        </div>
    )
}

export default NewResultForm;