'use client';

import { useState, useRef } from 'react';
import {
    Box,
    Typography,
    Paper,
    TextField,
    Button,
    MenuItem,
    Grid,
    IconButton
} from '@mui/material';
import { ArrowUpward, ArrowDownward, Edit, Delete, AddOutlined } from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import { PageHeader } from '@/components/PageHeader';
import { SectionDialog, SectionDialogRef } from '@/components/SectionDialog';


const categories = [
    'General Health',
    'Cardiac',
    'Respiratory',
    'Neurological',
    'Orthopedic',
    'Mental Health'
];

interface Section {
    id: number;
    title: string;
    questionCount: number;
    order: number;
}

export default function NewAssessment(props: {
    onActionClick?: () => void;
}) {
    const router = useRouter();
    const [errors, setErrors] = useState({
        title: '',
        category: '',
        description: ''
    });
    const [formData, setFormData] = useState({
        title: '',
        category: '',
        description: ''
    });

    // Add new state for sections
    const [sections, setSections] = useState<Section[]>([]);
    const [sectionCounter, setSectionCounter] = useState(1);
    const sectionDialogRef = useRef<SectionDialogRef>(null);

    const validateForm = () => {
        let isValid = true;
        const newErrors = {
            title: '',
            category: '',
            description: ''
        };

        if (!formData.title.trim()) {
            newErrors.title = 'Assessment title is required';
            isValid = false;
        }

        if (!formData.category) {
            newErrors.category = 'Category is required';
            isValid = false;
        }

        if (!formData.description.trim()) {
            newErrors.description = 'Description is required';
            isValid = false;
        } else if (formData.description.length < 10) {
            newErrors.description = 'Description must be at least 10 characters';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            // Handle form submission
            console.log('Form submitted:', formData);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user starts typing
        if (errors[name as keyof typeof errors]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    // Modify handleAddSection to open dialog
    const handleAddSection = () => {
        sectionDialogRef.current?.open();
    };

    // Add handleSaveSection
    const handleSaveSection = (sectionData: { title: string; description: string }) => {
        const newSection: Section = {
            id: sectionCounter,
            title: sectionData.title,
            questionCount: 0,
            order: sections.length
        };

        setSections([...sections, newSection]);
        setSectionCounter(prev => prev + 1);
    };

    // Move section handlers
    const handleMoveSection = (index: number, direction: 'up' | 'down') => {
        if ((direction === 'up' && index === 0) ||
            (direction === 'down' && index === sections.length - 1)) {
            return;
        }

        const newSections = [...sections];
        const swapIndex = direction === 'up' ? index - 1 : index + 1;

        // Swap order values
        const tempOrder = newSections[index].order;
        newSections[index].order = newSections[swapIndex].order;
        newSections[swapIndex].order = tempOrder;

        // Swap positions in array
        [newSections[index], newSections[swapIndex]] =
            [newSections[swapIndex], newSections[index]];

        setSections(newSections);
    };

    // Delete section handler
    const handleDeleteSection = (id: number) => {
        const newSections = sections.filter(section => section.id !== id)
            .map((section, index) => ({
                ...section,
                order: index
            }));
        setSections(newSections);
    };

    // Modify the existing handleEditSection function
    const handleEditSection = (id: number, index: number) => {
        router.push(`/assessment/form/section/${id}`);
    };

    return (
        <Box>
            <PageHeader
                title="Create New Assessment"
                subtitle="Enter the details for the new medical assessment"
                showBackButton={true}
                showActionButton={true}
                actionButtonText="Save Assessment"
                onActionClick={() => handleSubmit(new Event('submit') as unknown as React.FormEvent)}
            />

            <Paper sx={{
                p: 3,
                borderRadius: '10px',
                border: '1px solid #eff0f1ff',
                boxShadow: 'none',
            }}>
                <Typography
                    variant="h6"
                    fontWeight={600}
                    mb={3}
                    fontFamily={'var(--font-inter), sans-serif'}
                >
                    Assessment Details
                </Typography>

                <form onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                        <Grid size={6}>
                            <TextField
                                fullWidth
                                label="Assessment Title"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                error={!!errors.title}
                                helperText={errors.title}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: '8px'
                                    }
                                }}
                            />
                        </Grid>
                        <Grid size={6}>
                            <TextField
                                select
                                fullWidth
                                label="Category"
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                error={!!errors.category}
                                helperText={errors.category}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: '8px'
                                    }
                                }}
                            >
                                {categories.map((option) => (
                                    <MenuItem key={option} value={option}>
                                        {option}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid size={12}>
                            <TextField
                                fullWidth
                                multiline
                                rows={4}
                                label="Description"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                error={!!errors.description}
                                helperText={errors.description}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: '8px'
                                    }
                                }}
                            />
                        </Grid>

                    </Grid>
                </form>
            </Paper>

            {/* Section Block */}

            <Paper sx={{
                p: 3,
                borderRadius: '10px',
                border: '1px solid #eff0f1ff',
                boxShadow: 'none',
                marginTop: 3
            }}>
                <Grid container alignItems="center">
                    <Grid size={10}>
                        <Typography
                            variant="h6"
                            fontWeight={800}
                            fontFamily={'var(--font-inter), sans-serif'}
                        >
                            Sections ({sections.length})
                        </Typography>

                        <Typography
                            variant="subtitle2"
                            color="#6c757d"
                            fontFamily={'var(--font-inter), sans-serif'}
                        >
                            Organize your questions into logical sections. Each section can have conditional logic.
                        </Typography>

                    </Grid>
                    <Grid size={2} textAlign={'right'}>
                        <Button
                            onClick={handleAddSection}
                            variant="contained"
                            sx={{
                                background: 'linear-gradient(90deg, #408bff 0%, #3a7de6 100%)',
                                textTransform: 'none',
                                letterSpacing: '0.5px',
                                fontWeight: 500,
                                fontFamily: 'var(--font-inter), sans-serif',
                                borderRadius: '4px',
                                padding: '8px 24px',
                                boxShadow: '0 2px 8px rgba(64, 139, 255, 0.25)',
                                border: 'none',
                                '&:hover': {
                                    background: 'linear-gradient(90deg, #3a7de6 0%, #3670cc 100%)',
                                    boxShadow: '0 4px 12px rgba(64, 139, 255, 0.3)',
                                }
                            }}
                        >
                            <AddOutlined /> &nbsp; New Section
                        </Button>

                    </Grid>
                </Grid>

                {sections.length === 0 ? (
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
                            No Sections Added
                        </Typography>
                        <Typography
                            variant="body2"
                            color="#6c757d"
                            textAlign="center"
                            fontFamily={'var(--font-inter), sans-serif'}
                        >
                            {"Get started by clicking the \"New Section\" button above to create sections for your assessment."}
                        </Typography>
                    </Box>
                ) :
                    sections.map((section, index) => (
                        <Box
                            key={section.id}
                            style={{
                                border: '1px solid #eff0f1ff',
                                borderRadius: '8px',
                                padding: '15px',
                                marginTop: '20px'
                            }}
                        >
                            <Grid container alignItems="center" justifyContent="space-between">
                                <Grid size={9}>
                                    <Typography variant="subtitle2">
                                        <span style={{
                                            borderRadius: '90px',
                                            background: '#f5f5f5ff',
                                            width: '30px',
                                            height: '30px',
                                            display: 'inline-block',
                                            textAlign: 'center',
                                            lineHeight: '30px',
                                            fontWeight: 600
                                        }}>
                                            {index + 1}
                                        </span>
                                        <span style={{ fontWeight: 600, marginLeft: '20px' }}>
                                            {section.title}
                                        </span>
                                        &nbsp;({section.questionCount} questions)
                                    </Typography>
                                </Grid>
                                <Grid size={3}>
                                    <Box display="flex" gap={1} justifyContent={'flex-end'}>
                                        <IconButton
                                            size="small"
                                            color="primary"
                                            onClick={() => handleMoveSection(index, 'up')}
                                            disabled={index === 0}
                                            style={{
                                                border: '1px solid #e0e0e0',
                                                borderRadius: '6px',
                                                padding: '8px',
                                                margin: '4px'
                                            }}
                                        >
                                            <ArrowUpward fontSize="small" />
                                        </IconButton>
                                        <IconButton
                                            size="small"
                                            color="primary"
                                            onClick={() => handleMoveSection(index, 'down')}
                                            disabled={index === sections.length - 1}
                                            style={{
                                                border: '1px solid #e0e0e0',
                                                borderRadius: '6px',
                                                padding: '8px',
                                                margin: '4px'
                                            }}
                                        >
                                            <ArrowDownward fontSize="small" />
                                        </IconButton>
                                        <IconButton
                                            size="small"
                                            color="primary"
                                            onClick={() => handleEditSection(section.id, index)}
                                            style={{
                                                border: '1px solid #e0e0e0',
                                                borderRadius: '6px',
                                                padding: '8px',
                                                margin: '4px'
                                            }}
                                        >
                                            <Edit fontSize="small" />
                                        </IconButton>
                                        <IconButton
                                            size="small"
                                            color="error"
                                            onClick={() => handleDeleteSection(section.id)}
                                            style={{
                                                border: '1px solid #e0e0e0',
                                                borderRadius: '6px',
                                                padding: '8px',
                                                margin: '4px'
                                            }}
                                        >
                                            <Delete fontSize="small" />
                                        </IconButton>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Box>
                    ))}
            </Paper>

            <SectionDialog
                ref={sectionDialogRef}
                onSave={handleSaveSection}
            />
        </Box>
    );
}