export type SupportedLanguage = 'en' | 'vi' | 'ja' | 'ko';

const messages = {
  en: {
    required: (field: string) => `${field} is required`,
    invalidEmail: 'Invalid email address',
    min: (field: string, min: number) => `${field} must be at least ${min} characters`,
    fullName: 'Full Name',
    email: 'Email',
    phone: 'Phone Number',
    address: 'Address',
    jobTitle: 'Job Title',
    summary: 'Summary',
    cvTitle: 'CV Title',
    companyName: 'Company Name',
    position: 'Position',
    schoolName: 'School Name',
    major: 'Major',
    projectName: 'Project Name',
    skillName: 'Skill Name',
    level: 'Level',
    issuer: 'Issuer',
    issueDate: 'Issue Date',
    languageName: 'Language Name',
    name: 'Name',
    dateOrderError: 'Start Date cannot be later than End Date',
  },
  vi: {
    required: (field: string) => `${field} là bắt buộc`,
    invalidEmail: 'Địa chỉ email không hợp lệ',
    min: (field: string, min: number) => `${field} phải có ít nhất ${min} ký tự`,
    fullName: 'Họ và tên',
    email: 'Email',
    phone: 'Số điện thoại',
    address: 'Địa chỉ',
    jobTitle: 'Chức danh',
    summary: 'Giới thiệu bản thân',
    cvTitle: 'Tiêu đề CV',
    companyName: 'Tên công ty',
    position: 'Vị trí',
    schoolName: 'Tên trường',
    major: 'Chuyên ngành',
    projectName: 'Tên dự án',
    skillName: 'Tên kỹ năng',
    level: 'Trình độ',
    issuer: 'Tổ chức cấp',
    issueDate: 'Ngày cấp',
    languageName: 'Tên ngôn ngữ',
    name: 'Tên',
    dateOrderError: 'Ngày bắt đầu không thể muộn hơn ngày kết thúc',
  },
  ja: {
    required: (field: string) => `${field}は必須です`,
    invalidEmail: '無効なメールアドレスです',
    min: (field: string, min: number) => `${field}は少なくとも${min}文字である必要があります`,
    fullName: '氏名',
    email: 'メールアドレス',
    phone: '電話番号',
    address: '住所',
    jobTitle: '職種',
    summary: '自己紹介',
    cvTitle: '履歴書のタイトル',
    companyName: '会社名',
    position: '役職',
    schoolName: '学校名',
    major: '専攻',
    projectName: 'プロジェクト名',
    skillName: 'スキル名',
    level: 'レベル',
    issuer: '発行者',
    issueDate: '発行日',
    languageName: '言語名',
    name: '名前',
    dateOrderError: '開始日は終了日より後の日付にすることはできません',
  },
  ko: {
    required: (field: string) => `${field}은(는) 필수입니다`,
    invalidEmail: '유효하지 않은 이메일 주소입니다',
    min: (field: string, min: number) => `${field}은(는) 최소 ${min}자 이상이어야 합니다`,
    fullName: '성명',
    email: '이메일',
    phone: '전화번호',
    address: '주소',
    jobTitle: '직함',
    summary: '자기소개',
    cvTitle: '이력서 제목',
    companyName: '회사명',
    position: '직위',
    schoolName: '학교명',
    major: '전공',
    projectName: '프로젝트명',
    skillName: '기술명',
    level: '수준',
    issuer: '발행처',
    issueDate: '발행일',
    languageName: '언어명',
    name: '이름',
    dateOrderError: '시작일은 종료일보다 늦을 수 없습니다',
  },
};

// Simple language detection (could be improved)
const getCurrentLanguage = (): SupportedLanguage => {
  // Try to get from localStorage or navigator
  const saved = localStorage.getItem('language') as SupportedLanguage;
  if (saved && messages[saved]) return saved;

  const navLang = navigator.language.split('-')[0] as SupportedLanguage;
  if (navLang && messages[navLang]) return navLang;

  return 'en'; // Default to English as a safe bet for generic "system"
};

export const getTranslation = (lang: SupportedLanguage = getCurrentLanguage()) => {
  return messages[lang] || messages.en;
};

export const validationMessages = getTranslation();
