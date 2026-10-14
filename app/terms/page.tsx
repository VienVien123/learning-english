import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Điều khoản sử dụng — TV-English",
  description: "Các điều khoản khi sử dụng ứng dụng học từ vựng TV-English.",
};

export default function TermsPage() {
  return (
    <LegalPage
      title="Điều khoản sử dụng"
      intro="Khi tạo tài khoản hoặc sử dụng TV-English, bạn đồng ý với các điều khoản dưới đây."
    >
      <section>
        <h2>1. Dịch vụ</h2>
        <p>TV-English là ứng dụng miễn phí giúp bạn học và ôn tập từ vựng tiếng Anh qua bài học, flashcard và trò chơi.</p>
      </section>
      <section>
        <h2>2. Tài khoản</h2>
        <ul>
          <li>Bạn chịu trách nhiệm giữ an toàn cho tài khoản và mật khẩu của mình.</li>
          <li>Mỗi người nên dùng một tài khoản riêng; không chia sẻ tài khoản cho người khác.</li>
        </ul>
      </section>
      <section>
        <h2>3. Nội dung của bạn</h2>
        <ul>
          <li>Từ vựng, ví dụ và ghi chú bạn tạo thuộc về bạn. Chúng tôi chỉ lưu trữ để phục vụ việc học của chính bạn.</li>
          <li>Không đưa vào ứng dụng nội dung vi phạm pháp luật, xúc phạm người khác hoặc vi phạm bản quyền.</li>
          <li>Gợi ý do AI tạo ra có thể chưa chính xác hoàn toàn; hãy kiểm tra lại trước khi dùng.</li>
        </ul>
      </section>
      <section>
        <h2>4. Sử dụng hợp lý</h2>
        <p>Không cố tình phá hoại, tấn công, khai thác lỗi hoặc gửi số lượng yêu cầu bất thường làm ảnh hưởng tới hệ thống và người dùng khác.</p>
      </section>
      <section>
        <h2>5. Giới hạn trách nhiệm</h2>
        <p>Ứng dụng được cung cấp “nguyên trạng”. Chúng tôi cố gắng giữ dịch vụ ổn định và dữ liệu an toàn, nhưng không cam kết dịch vụ luôn hoạt động liên tục hoặc không có lỗi.</p>
      </section>
      <section>
        <h2>6. Ngừng sử dụng</h2>
        <p>Bạn có thể ngừng sử dụng và yêu cầu xoá tài khoản bất cứ lúc nào. Chúng tôi có thể tạm khoá tài khoản vi phạm các điều khoản này.</p>
      </section>
      <section>
        <h2>7. Thay đổi điều khoản</h2>
        <p>Điều khoản có thể được cập nhật; ngày “Cập nhật lần cuối” ở trên cho biết lần thay đổi gần nhất.</p>
      </section>
    </LegalPage>
  );
}
