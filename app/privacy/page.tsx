import type { Metadata } from "next";
import LegalPage, { CONTACT_EMAIL } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Chính sách bảo mật — TV-English",
  description: "TV-English thu thập dữ liệu gì, dùng vào việc gì và bạn có những quyền gì.",
};

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Chính sách bảo mật"
      intro="TV-English là ứng dụng học từ vựng tiếng Anh. Trang này giải thích chúng tôi thu thập dữ liệu gì, dùng vào việc gì và bạn có thể kiểm soát dữ liệu của mình như thế nào."
    >
      <section>
        <h2>1. Dữ liệu chúng tôi thu thập</h2>
        <ul>
          <li><b>Thông tin tài khoản:</b> địa chỉ email và tên hiển thị. Khi đăng nhập bằng Google, chúng tôi nhận tên, email và ảnh đại diện từ tài khoản Google của bạn. Chúng tôi không nhận mật khẩu Google.</li>
          <li><b>Dữ liệu học tập:</b> các bộ từ, từ vựng, nghĩa, ví dụ, ghi chú bạn tạo; lịch sử ôn tập; điểm XP, chuỗi ngày học và mục tiêu hằng ngày.</li>
          <li><b>Cài đặt trên thiết bị:</b> giao diện sáng/tối, bật tắt âm thanh, sổ “Cần ôn”, bản nháp từ đang nhập. Những thông tin này được lưu trong trình duyệt của bạn.</li>
        </ul>
      </section>
      <section>
        <h2>2. Chúng tôi dùng dữ liệu để</h2>
        <ul>
          <li>Đăng nhập và giữ tài khoản của bạn an toàn.</li>
          <li>Lưu và đồng bộ từ vựng, tiến độ học giữa các thiết bị.</li>
          <li>Lên lịch ôn tập, tính điểm, chuỗi ngày học và thành tích.</li>
        </ul>
        <p>Chúng tôi <b>không bán</b> dữ liệu của bạn, không hiển thị quảng cáo và không dùng dữ liệu cho mục đích nào khác ngoài vận hành ứng dụng.</p>
      </section>
      <section>
        <h2>3. Dịch vụ bên thứ ba</h2>
        <ul>
          <li><b>Supabase:</b> lưu trữ dữ liệu và xác thực đăng nhập.</li>
          <li><b>Google:</b> đăng nhập bằng tài khoản Google (nếu bạn chọn cách này).</li>
          <li><b>Vercel:</b> máy chủ chạy trang web.</li>
          <li><b>Google Gemini:</b> khi bạn bấm “Tạo gợi ý”, từ tiếng Anh bạn nhập được gửi đi để tạo nghĩa, phiên âm và câu ví dụ. Email hay dữ liệu cá nhân của bạn không được gửi kèm.</li>
          <li><b>Phát âm và nhận dạng giọng nói:</b> dùng tính năng có sẵn của trình duyệt. Khi luyện phát âm, trình duyệt có thể gửi âm thanh tới dịch vụ nhận dạng của nhà cung cấp trình duyệt; TV-English không ghi âm và không lưu âm thanh của bạn.</li>
        </ul>
      </section>
      <section>
        <h2>4. Bảo mật</h2>
        <p>Dữ liệu được truyền qua kết nối mã hoá (HTTPS). Mỗi tài khoản chỉ đọc và sửa được dữ liệu của chính mình nhờ cơ chế phân quyền theo hàng (Row Level Security) của cơ sở dữ liệu.</p>
      </section>
      <section>
        <h2>5. Quyền của bạn</h2>
        <ul>
          <li>Xem, sửa và xoá bất kỳ từ vựng, bộ từ nào ngay trong ứng dụng.</li>
          <li>Đăng xuất bất cứ lúc nào; khi đăng xuất, bản lưu ngoại tuyến trên thiết bị sẽ được xoá.</li>
          <li>Yêu cầu xoá toàn bộ tài khoản và dữ liệu bằng cách gửi email tới <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>. Chúng tôi sẽ xử lý trong vòng 30 ngày.</li>
        </ul>
      </section>
      <section>
        <h2>6. Trẻ em</h2>
        <p>TV-English phù hợp cho người học ở mọi độ tuổi. Nếu bạn dưới 13 tuổi, hãy sử dụng ứng dụng với sự đồng ý của cha mẹ hoặc người giám hộ.</p>
      </section>
      <section>
        <h2>7. Thay đổi chính sách</h2>
        <p>Khi chính sách thay đổi, chúng tôi sẽ cập nhật trang này và ngày “Cập nhật lần cuối” ở trên.</p>
      </section>
    </LegalPage>
  );
}
