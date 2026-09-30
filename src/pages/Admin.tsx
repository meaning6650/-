import { Button, Field, Select, Table, TextInput, ui } from '../components';

const USERS = [
  { email: 'admin@example.org', role: '관리자' },
  { email: 'editor@example.org', role: '편집자' },
  { email: 'viewer@example.org', role: '열람자' },
];
const CUSTOM = [{ label: '국회요구자료 제출 여부', type: '선택형', options: 'O / X / 해당없음' }];

/** 07 관리 (관리자 전용) — 3·8단계에서 데이터 연결 */
export function Admin() {
  return (
    <div style={{ maxWidth: 1040, margin: '0 auto', padding: '28px 24px 56px', display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <h1 style={{ fontSize: 22, fontWeight: 700 }}>관리</h1>
        <p style={{ color: 'var(--muted)', fontSize: 13, marginTop: 4 }}>관리자 전용 / 사용자 권한·추가 항목·엑셀 가져오기·내보내기</p>
      </div>
      <section>
        <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12 }}>사용자 권한</h2>
        <Table rows={USERS} rowKey={(u) => u.email} columns={[
          { key: 'e', header: '이메일', render: (u) => u.email },
          { key: 'r', header: '권한', render: (u) => u.role, width: 120, align: 'center' },
          { key: 'x', header: '', render: () => <Button variant="ghost">삭제</Button>, width: 90, align: 'center' },
        ]} />
        <div className={ui.card} style={{ padding: '4px 20px', marginTop: 12 }}>
          <Field label="이메일 추가"><TextInput placeholder="(작성 필요) 예: name@khepi.or.kr" /></Field>
          <Field label="권한"><Select options={['관리자', '편집자', '열람자']} /></Field>
        </div>
      </section>
      <section>
        <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12 }}>추가 항목 (국회요구자료 등)</h2>
        <Table rows={CUSTOM} rowKey={(c) => c.label} columns={[
          { key: 'l', header: '항목명', render: (c) => c.label },
          { key: 't', header: '형식', render: (c) => c.type, width: 100, align: 'center' },
          { key: 'o', header: '선택지', render: (c) => c.options },
        ]} />
      </section>
      <section style={{ display: 'flex', gap: 8 }}>
        <Button variant="primary">엑셀 내보내기 (표준 원자료)</Button>
        <Button>홈페이지 게시현황 양식</Button>
        <Button>국회요구자료 맞춤</Button>
      </section>
    </div>
  );
}
