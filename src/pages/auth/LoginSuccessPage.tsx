import { useEffect } from 'react';
import { useSearchParams } from 'react-router';
// Lưu ý: Nếu bạn dùng bản cũ thì import từ 'react-router-dom'

function LoginSuccessPage() {
  const [searchParams] = useSearchParams();

  useEffect(() => {
    // 1. Lấy token từ thanh địa chỉ (URL)
    const token = searchParams.get('token');

    if (token) {
      // 2. Lưu token vào kho chứa của trình duyệt
      localStorage.setItem('access_token', token);

      // 3. Ép trình duyệt F5 và bay thẳng về trang chủ (Dashboard)
      // Cách này triệt tiêu hoàn toàn lỗi state "Quả bóng bàn"
      window.location.href = '/';
    } else {
      // Nếu không có token (bị lỗi), đá ngược về trang Login
      window.location.href = '/login';
    }
  }, [searchParams]);

  // Giao diện chờ mượt mà (Thường user chỉ kịp nhìn thấy nó chớp qua 1 cái)
  return (
    <div className='flex h-screen items-center justify-center bg-gray-50'>
      <div className='flex flex-col items-center'>
        {/* Spinner xoay xoay màu cam đồng bộ với theme của bạn */}
        <div className='mb-4 h-12 w-12 animate-spin rounded-full border-4 border-orange-500 border-t-transparent'></div>
        <h2 className='text-xl font-semibold text-gray-700'>Đang xác thực tài khoản...</h2>
        <p className='text-sm text-gray-500'>Vui lòng đợi trong giây lát.</p>
      </div>
    </div>
  );
}

export default LoginSuccessPage;
