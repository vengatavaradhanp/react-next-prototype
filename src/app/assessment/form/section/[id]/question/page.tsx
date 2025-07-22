"use client";
import {
    Box,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Button,
    Typography,
    IconButton,
    Card,
    CardContent,
    Grid,
    Chip,
    Tabs,
    Tab,
    Paper,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from 'react';
import { describe } from 'node:test';
import { PageHeader } from '@/components/PageHeader';
import { useRouter } from 'next/navigation';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import NumbersIcon from '@mui/icons-material/Numbers';
import ShortTextIcon from '@mui/icons-material/ShortText';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import StarsIcon from '@mui/icons-material/Stars';

interface Option {
    value: string;
    label: string;
}

interface ConditionalLogic {
    sourceQuestion: string;
    operator: string;
    value: string;
    action: 'show' | 'hide' | 'disable';
}

export default function AssessmentQuestion() {
    const [fieldType, setFieldType] = useState('text');
    const [question, setQuestion] = useState('');
    const [placeholder, setPlaceholder] = useState('');
    const [description, setDescription] = useState('');
    const [options, setOptions] = useState<Option[]>([]);
    const [conditionalLogics, setConditionalLogics] = useState<ConditionalLogic[]>([]);
    const [activeTab, setActiveTab] = useState(0);
    const router = useRouter();

    const fieldTypes = [
        { value: 'text', label: 'Text Input', icon: <TextFieldsIcon /> },
        { value: 'number', label: 'Number Input', icon: <NumbersIcon /> },
        { value: 'textarea', label: 'Text Area', icon: <ShortTextIcon /> },
        { value: 'radio', label: 'Single Choice (Radio)', icon: <RadioButtonCheckedIcon /> },
        { value: 'checkbox', label: 'Multiple Choice (Checkbox)', icon: <CheckBoxIcon /> },
        { value: 'date', label: 'Date Picker', icon: <CalendarMonthIcon /> },
        { value: 'time', label: 'Time Picker', icon: <AccessTimeIcon /> },
        { value: 'scale', label: 'Rating Scale', icon: <StarsIcon /> },
    ];

    const operators = [
        { value: 'equals', label: 'Equals' },
        { value: 'not_equals', label: 'Not Equals' },
        { value: 'greater_than', label: 'Greater Than' },
        { value: 'less_than', label: 'Less Than' },
        { value: 'contains', label: 'Contains' },
    ];

    const actions = [
        { value: 'show', label: 'Show' },
        { value: 'hide', label: 'Hide' },
        { value: 'disable', label: 'Disable' },
    ];

    const handleAddOption = () => {
        setOptions([...options, { value: '', label: '' }]);
    };

    const handleRemoveOption = (index: number) => {
        const newOptions = [...options];
        newOptions.splice(index, 1);
        setOptions(newOptions);
    };

    const handleAddLogic = () => {
        setConditionalLogics([...conditionalLogics, {
            sourceQuestion: '',
            operator: 'equals',
            value: '',
            action: 'show'
        }]);
    };

    const handleRemoveLogic = (index: number) => {
        const newLogics = [...conditionalLogics];
        newLogics.splice(index, 1);
        setConditionalLogics(newLogics);
    };

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setActiveTab(newValue);
    };

    const BasicSettingsTab = () => (
        <Paper sx={{
            p: 3,
            // borderRadius: '10px',
            border: '1px solid #eff0f1ff',
            boxShadow: 'none',
            marginTop: 3,
        }}>
            <Grid container spacing={3}>
                <Grid size={12}>
                    <TextField
                        fullWidth
                        label="Question Title"
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        multiline
                        rows={4}
                    />
                </Grid>
                <Grid size={6}>
                    <FormControl fullWidth>
                        <InputLabel>Field Type</InputLabel>
                        <Select
                            value={fieldType}
                            label="Field Type"
                            onChange={(e) => setFieldType(e.target.value)}
                        >
                            {fieldTypes.map((type) => (
                                <MenuItem key={type.value} value={type.value} sx={{ display: 'flex', gap: 1 }}>
                                    {type.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid size={6}>
                    <TextField
                        fullWidth
                        label="Placeholder Text"
                        value={placeholder}
                        onChange={(e) => setPlaceholder(e.target.value)}
                    />
                </Grid>
                <Grid size={12}>
                    <TextField
                        fullWidth
                        label="Description (Optional)"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        multiline
                        rows={4}
                    />
                </Grid>
            </Grid>

        </Paper>
    );

    const OptionsTab = () => (
        <Paper sx={{
            p: 3,
            borderRadius: '10px',
            border: '1px solid #eff0f1ff',
            boxShadow: 'none',
            marginTop: 3,
        }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h6">Answer Options</Typography>

                <Button
                    startIcon={<AddIcon />}
                    onClick={handleAddOption}
                    variant="outlined"
                    size='large'
                    sx={{
                        // background: 'linear-gradient(90deg, #408bff 0%, #3a7de6 100%)',
                        textTransform: 'none',
                        letterSpacing: '0.5px',
                        fontWeight: 500,
                        fontFamily: 'var(--font-inter), sans-serif',
                        borderRadius: '4px',
                        padding: '8px 24px',
                        // boxShadow: '0 2px 8px rgba(64, 139, 255, 0.25)',
                        // border: 'none',
                        // '&:hover': {
                        //     background: 'linear-gradient(90deg, #3a7de6 0%, #3670cc 100%)',
                        //     boxShadow: '0 4px 12px rgba(64, 139, 255, 0.3)',
                        // }
                    }}

                >
                    Add Option
                </Button>
            </Box>
            {
                options.length === 0 && (
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            py: 8,
                            px: 3,
                            border: '1px dashed #eff0f1ff',
                            borderRadius: '8px',
                            mt: 3,
                            backgroundColor: '#fafafa'
                        }}
                    >
                        <Box
                            sx={{
                                width: '48px',
                                height: '48px',
                                borderRadius: '50%',
                                backgroundColor: '#f5f5f5ff',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                mb: 2
                            }}
                        >
                            <Typography
                                variant="h6"
                                color="#6c757d"
                                fontWeight={600}
                            >
                                0
                            </Typography>
                        </Box>
                        <Typography
                            variant="h6"
                            color="#6c757d"
                            fontWeight={600}
                            fontFamily={'var(--font-inter), sans-serif'}
                            gutterBottom
                        >
                            No Options Added
                        </Typography>
                        <Typography
                            variant="body2"
                            color="#6c757d"
                            textAlign="center"
                            fontFamily={'var(--font-inter), sans-serif'}
                        >
                            No options yet. Add your first option to get started.
                        </Typography>
                    </Box>
                )
            }
            {options.map((option, index) => (
                <Box key={index} sx={{ display: 'flex', gap: 2, mb: 2 }}>
                    <TextField
                        label="Option Label"
                        value={option.label}
                        onChange={(e) => {
                            const newOptions = [...options];
                            newOptions[index].label = e.target.value;
                            setOptions(newOptions);
                        }}
                    />
                    <TextField
                        label="Option Value"
                        value={option.value}
                        onChange={(e) => {
                            const newOptions = [...options];
                            newOptions[index].value = e.target.value;
                            setOptions(newOptions);
                        }}
                    />
                    <IconButton onClick={() => handleRemoveOption(index)} color="error"
                    >
                        <DeleteIcon />
                    </IconButton>
                </Box>
            ))}
        </Paper>
    );

    const ConditionalLogicsTab = () => (
        <Paper sx={{
            p: 3,
            borderRadius: '10px',
            border: '1px solid #eff0f1ff',
            boxShadow: 'none',
            marginTop: 3,
        }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h6">Conditional Logic</Typography>
                <Button
                    startIcon={<AddIcon />}
                    onClick={handleAddLogic}
                    variant="outlined"
                    size='large'
                    sx={{
                        // background: 'linear-gradient(90deg, #408bff 0%, #3a7de6 100%)',
                        textTransform: 'none',
                        letterSpacing: '0.5px',
                        fontWeight: 500,
                        fontFamily: 'var(--font-inter), sans-serif',
                        borderRadius: '4px',
                        padding: '8px 24px',
                        // boxShadow: '0 2px 8px rgba(64, 139, 255, 0.25)',
                        // border: 'none',
                        // '&:hover': {
                        //     background: 'linear-gradient(90deg, #3a7de6 0%, #3670cc 100%)',
                        //     boxShadow: '0 4px 12px rgba(64, 139, 255, 0.3)',
                        // }
                    }}
                >
                    Add Logic
                </Button>
            </Box>
            {
                conditionalLogics.length === 0 && (
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            py: 8,
                            px: 3,
                            border: '1px dashed #eff0f1ff',
                            borderRadius: '8px',
                            mt: 3,
                            backgroundColor: '#fafafa'
                        }}
                    >
                        <Box
                            sx={{
                                width: '48px',
                                height: '48px',
                                borderRadius: '50%',
                                backgroundColor: '#f5f5f5ff',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                mb: 2
                            }}
                        >
                            <Typography
                                variant="h6"
                                color="#6c757d"
                                fontWeight={600}
                            >
                                0
                            </Typography>
                        </Box>
                        <Typography
                            variant="h6"
                            color="#6c757d"
                            fontWeight={600}
                            fontFamily={'var(--font-inter), sans-serif'}
                            gutterBottom
                        >
                            No Conditional Logics Added
                        </Typography>
                        <Typography
                            variant="body2"
                            color="#6c757d"
                            textAlign="center"
                            fontFamily={'var(--font-inter), sans-serif'}
                        >
                            No other questions available for conditional logic.
                            Add more questions to this section first.
                        </Typography>
                    </Box>
                )
            }
            {conditionalLogics.map((logic, index) => (
                <Box key={index} sx={{ display: 'flex', gap: 2, mb: 2, alignItems: 'center' }}>
                    <TextField
                        label="If Question"
                        value={logic.sourceQuestion}
                        onChange={(e) => {
                            const newLogics = [...conditionalLogics];
                            newLogics[index].sourceQuestion = e.target.value;
                            setConditionalLogics(newLogics);
                        }}
                    />
                    <FormControl sx={{ minWidth: 200 }}>
                        <InputLabel>Operator</InputLabel>
                        <Select
                            value={logic.operator}
                            label="Operator"
                            onChange={(e) => {
                                const newLogics = [...conditionalLogics];
                                newLogics[index].operator = e.target.value;
                                setConditionalLogics(newLogics);
                            }}
                        >
                            {operators.map((op) => (
                                <MenuItem key={op.value} value={op.value}>
                                    {op.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <TextField
                        label="Value"
                        value={logic.value}
                        onChange={(e) => {
                            const newLogics = [...conditionalLogics];
                            newLogics[index].value = e.target.value;
                            setConditionalLogics(newLogics);
                        }}
                    />
                    <FormControl sx={{ minWidth: 200 }}>
                        <InputLabel>Action</InputLabel>
                        <Select
                            value={logic.action}
                            label="Action"
                            onChange={(e) => {
                                const newLogics = [...conditionalLogics];
                                newLogics[index].action = e.target.value as 'show' | 'hide' | 'disable';
                                setConditionalLogics(newLogics);
                            }}
                        >
                            {actions.map((action) => (
                                <MenuItem key={action.value} value={action.value}>
                                    {action.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <IconButton onClick={() => handleRemoveLogic(index)} color="error">
                        <DeleteIcon />
                    </IconButton>
                </Box>
            ))}
        </Paper>
    );

    return (
        <Box>
            <PageHeader
                title={`Create a Question`}
                subtitle="Configure question settings and conditional logic"
                showBackButton={true}
                showActionButton={true}
                actionButtonText="Save Question"
                onActionClick={() => router.back()}
            />

            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={activeTab} onChange={handleTabChange}>
                    <Tab label="Basic Settings" />
                    <Tab label="Options" disabled={!['radio', 'checkbox'].includes(fieldType)} />
                    <Tab label="Conditional Logic" />
                </Tabs>
            </Box>

            {activeTab === 0 && <BasicSettingsTab />}
            {activeTab === 1 && <OptionsTab />}
            {activeTab === 2 && <ConditionalLogicsTab />}

            {/* <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                <Button variant="outlined">Cancel</Button>
                <Button variant="contained" color="primary">
                    Save Question
                </Button>
            </Box> */}
        </Box>
    );
}