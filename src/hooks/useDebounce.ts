import { useDebounce } from '@/hooks/useDebounce';
import { Box, Grid, Paper, TextField } from '@mui/material';
import { useEffect, useState } from 'react';

export function useDebounce<T>(value: T, delay: number = 300): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(timer);
        };
    }, [value, delay]);

    return debouncedValue;
}

export default function AssessmentQuestion() {
    // Local state for immediate UI updates
    const [localQuestion, setLocalQuestion] = useState('');
    const [localPlaceholder, setLocalPlaceholder] = useState('');
    const [localDescription, setLocalDescription] = useState('');

    // Debounced state for actual updates
    const question = useDebounce(localQuestion);
    const placeholder = useDebounce(localPlaceholder);
    const description = useDebounce(localDescription);

    const BasicSettingsTab = () => (
        <Paper sx= {{
            p: 3,
            border: '1px solid #eff0f1ff',
            boxShadow: 'none',
            marginTop: 3,
        }
}>
    <Grid container spacing = { 3} >
        <Grid size={ 12 }>
            <TextField
                        fullWidth
label = "Question Title"
value = { localQuestion }
onChange = {(e) => setLocalQuestion(e.target.value)}
multiline
rows = { 4}
    />
    </Grid>
{/* ...other fields... */ }
<Grid size={ 6 }>
    <TextField
                        fullWidth
label = "Placeholder Text"
value = { localPlaceholder }
onChange = {(e) => setLocalPlaceholder(e.target.value)}
                    />
    </Grid>
    < Grid size = { 12} >
        <TextField
                        fullWidth
label = "Description (Optional)"
value = { localDescription }
onChange = {(e) => setLocalDescription(e.target.value)}
multiline
rows = { 4}
    />
    </Grid>
    </Grid>
    </Paper>
    );

// For options and conditional logic fields, implement similar pattern:
const handleOptionChange = (index: number, field: 'label' | 'value', value: string) => {
    const newOptions = [...options];
    newOptions[index][field] = value;
    setOptions(newOptions);
};

const OptionsTab = () => (
    // ...existing code...
    {
        options.map((option, index) => (
            <Box key= { index } sx = {{ display: 'flex', gap: 2, mb: 2 }} >
    <TextField
                    label= "Option Label"
value = { option.label }
onChange = {(e) => handleOptionChange(index, 'label', e.target.value)}
                />
    < TextField
label = "Option Value"
value = { option.value }
onChange = {(e) => handleOptionChange(index, 'value', e.target.value)}
                />
{/* ...rest of the code... */ }
</Box>
        ))}
        // ...existing code...
    );
}