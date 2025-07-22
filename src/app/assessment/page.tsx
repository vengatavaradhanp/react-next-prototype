/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from 'react';
import { Box, Button, Typography, MenuItem, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Grid } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { AddOutlined, Edit, RemoveRedEyeOutlined } from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import { mockAssessments } from '@/mocks/mockData';

const statusStyles: any = {
    'In Progress': {
        backgroundColor: '#fff3cd',
        color: '#d8a714ff',
        fontWeight: 600,
        borderRadius: '4px',
        padding: '4px 8px',
        width: '120px',
        textAlign: 'center',
    },
    Completed: {
        backgroundColor: '#d4edda',
        fontWeight: 600,
        borderRadius: '4px',
        padding: '4px 8px',
        width: '120px',
        textAlign: 'center',
        color: '#18cf43ff',
    },
};

const Assessments = () => {
    const router = useRouter();
    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Box>
                    <Typography variant="h5" fontWeight={600} fontFamily={'var(--font-inter), sans-serif'}>Assessment Records</Typography>
                    <Typography variant="subtitle1" color="#6c757d" fontFamily={'var(--font-inter), sans-serif'}>
                        View and manage all assessments for City General Hospital
                    </Typography>
                </Box>
                <Button onClick={() => router.push('/assessment/form')} variant="contained" sx={{ backgroundColor: '#408bff', textTransform: 'none', letterSpacing: '0.5px', fontWeight: 500, fontFamily: 'var(--font-inter), sans-serif', borderRadius: '4px', padding: '8px 20px', boxShadow: 'none', border: '1px solid #408bff' }} size='large' disableRipple><AddOutlined /> &nbsp; New Assessment</Button>
            </Box>

            <Box sx={{ border: '1px solid #e4e5e7', borderRadius: '10px', padding: 3, backgroundColor: '#fff' }}>
                <Grid container spacing={2} sx={{ mb: 2 }}>
                    <Grid size={2}>
                        <Select defaultValue="All Statuses" fullWidth style={{ borderRadius: '12px', height: '50px' }} label="Filter by Status">
                            <MenuItem value="All Statuses">All Statuses</MenuItem>
                            <MenuItem value="In Progress">In Progress</MenuItem>
                            <MenuItem value="Completed">Completed</MenuItem>
                        </Select>
                    </Grid>
                    <Grid size={2}>
                        <Select defaultValue="All Time" fullWidth style={{ borderRadius: '12px', height: '50px' }}>
                            <MenuItem value="All Time">All Time</MenuItem>
                            <MenuItem value="Last 30 Days">Last 30 Days</MenuItem>
                        </Select>
                    </Grid>
                    <Grid size={2}>
                        <Select defaultValue="Most Recent" fullWidth style={{ borderRadius: '12px', height: '50px' }}>
                            <MenuItem value="Most Recent">Most Recent</MenuItem>
                            <MenuItem value="Oldest">Oldest</MenuItem>
                        </Select>
                    </Grid>
                </Grid>

                <TableContainer style={{ borderRadius: '12px', overflow: 'hidden' }} >
                    <Table >
                        <TableHead sx={{ backgroundColor: '#f5f9ff' }}>
                            <TableRow>
                                <TableCell><strong>Assessment Date</strong></TableCell>
                                <TableCell><strong>Status</strong></TableCell>
                                <TableCell><strong>Completed By</strong></TableCell>
                                <TableCell><strong>Actions</strong></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {mockAssessments.map((row, index) => (
                                <TableRow key={row.id}>
                                    <TableCell>{row.date}</TableCell>
                                    <TableCell>
                                        <Box sx={statusStyles[row.status]}>{row.status}</Box>
                                    </TableCell>
                                    <TableCell>{row.completedBy || '-'}</TableCell>
                                    <TableCell>
                                        {row.actions.includes('edit') && (
                                            <IconButton><Edit style={{ fontSize: '25px', color: '#408bff' }} /></IconButton>
                                        )}
                                        {row.actions.includes('view') && (
                                            <IconButton><RemoveRedEyeOutlined style={{ fontSize: '25px', color: '#408bff' }} /></IconButton>
                                        )}
                                        {row.actions.includes('pdf') && (
                                            <IconButton><PictureAsPdfIcon style={{ fontSize: '25px', color: '#18cf43ff' }} /></IconButton>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Box>
    );
};

export default Assessments;