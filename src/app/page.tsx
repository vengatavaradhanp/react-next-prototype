// import { Suspense } from 'react';
// import dynamic from 'next/dynamic';
// import styles from "./page.module.css";
// import { Box } from '@mui/material';

// // Dynamically import the Assessments component
// const Assessments = dynamic(() => import('./assessment/page'), {
//   loading: () => <p>Loading...</p>
// });

// export default function RootLayout({ children }: { children: React.ReactNode }) {
//   return (
//     <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
//       <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
//         <Suspense fallback={<p>Loading...</p>}>
//           {children}
//         </Suspense>
//       </Box>
//       {/* <Box component="footer" sx={{ mt: 'auto', p: 2, textAlign: 'center' }}>
//         <p>© {new Date().getFullYear()} Medical Assessment App</p>
//       </Box> */}
//     </Box>
//   );
// }

import { redirect } from 'next/navigation';

export default function Home() {
  redirect('/auth/signin');
}


// import { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchData } from '../../store/apiSlice';
// import { RootState, AppDispatch } from '../../store/store';

// const HomePage = () => {
//     const dispatch = useDispatch<AppDispatch>();
//     const { data, loading, error } = useSelector((state: RootState) => state.api);

//     useEffect(() => {
//         dispatch(fetchData('/objects'));
//     }, [dispatch]);

//     if (loading) return <div>Loading...</div>;
//     if (error) return <div>Error loading items.</div>;

//     const items = data as Item[];

//     return (
//         <div>
//             <h1>Home Page</h1>
//             <h2>Items from Server:</h2>
//             <ul>
//                 {items?.map((item) => (
//                     <li key={item.id}>{item.name}</li>
//                 ))}
//             </ul>
//         </div>
//     );
// };

// export default HomePage;