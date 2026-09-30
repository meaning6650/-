import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import { ToastProvider } from '../components';
import { Layout } from './Layout';
import { Start } from '../pages/Start';
import { Projects } from '../pages/Projects';
import { Regulations } from '../pages/Regulations';
import { Flow } from '../pages/Flow';
import { Committee } from '../pages/Committee';
import { Admin } from '../pages/Admin';

/** GitHub Pages 정적 호스팅 → HashRouter 사용 (새로고침 시 404 방지) */
export function App() {
  return (
    <ToastProvider>
      <HashRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Start />} />
            <Route path="projects" element={<Projects />} />
            <Route path="projects/:id" element={<Projects />} />
            <Route path="committee" element={<Committee />} />
            <Route path="regulations" element={<Regulations />} />
            <Route path="flow" element={<Flow />} />
            <Route path="admin" element={<Admin />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </HashRouter>
    </ToastProvider>
  );
}
