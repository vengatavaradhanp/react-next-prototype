export interface AssessmentRecord {
    id: string;
    date: string;
    status: 'In Progress' | 'Completed' | 'Pending';
    completedBy: string;
    actions: string[];
    patientName: string;
    patientId: string;
    assessmentType: string;
    department: string;
    priority: 'Low' | 'Medium' | 'High';
    lastModified: string;
}

export const mockAssessments: AssessmentRecord[] = [
    {
        id: 'ASS001',
        patientId: 'P001',
        patientName: 'John Smith',
        date: 'Jun 20, 2025',
        status: 'In Progress',
        priority: 'High',
        completedBy: '',
        actions: ['edit'],
        assessmentType: 'Annual Health Check',
        department: 'General Medicine',
        lastModified: 'Jun 20, 2025'
    },
    {
        id: 'ASS002',
        patientId: 'P002',
        patientName: 'Emma Wilson',
        date: 'Apr 01, 2025',
        status: 'Completed',
        priority: 'Medium',
        completedBy: 'Dr. Sarah Johnson',
        actions: ['view', 'pdf'],
        assessmentType: 'Cardiac Evaluation',
        department: 'Cardiology',
        lastModified: 'Apr 01, 2025'
    },
    {
        id: 'ASS003',
        patientId: 'P003',
        patientName: 'Robert Davis',
        date: 'May 15, 2025',
        status: 'Completed',
        priority: 'Medium',
        completedBy: 'Dr. Michael Chen',
        actions: ['view', 'pdf'],
        assessmentType: 'Diabetes Screening',
        department: 'Endocrinology',
        lastModified: 'May 15, 2025'
    },
    {
        id: 'ASS004',
        patientId: 'P004',
        patientName: 'Alice Brown',
        date: 'Jun 18, 2025',
        status: 'In Progress',
        priority: 'Low',
        completedBy: '',
        actions: ['edit'],
        assessmentType: 'Physical Therapy Assessment',
        department: 'Physiotherapy',
        lastModified: 'Jun 18, 2025'
    },
    {
        id: 'ASS005',
        patientId: 'P005',
        patientName: 'David Miller',
        date: 'Jun 10, 2025',
        status: 'Completed',
        priority: 'High',
        completedBy: 'Dr. Emily White',
        actions: ['view', 'pdf'],
        assessmentType: 'Mental Health Evaluation',
        department: 'Psychiatry',
        lastModified: 'Jun 10, 2025'
    }
];