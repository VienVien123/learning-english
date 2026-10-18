import type { GrammarTopic } from "./types";

export const B2_TOPICS: GrammarTopic[] = [
  // ---------------------------------------------------------------------------
  // 1. Conditional type 3 + mixed conditionals
  // ---------------------------------------------------------------------------
  {
    id: "b2-conditional-3-mixed",
    level: "B2",
    title: "Câu điều kiện loại 3 và câu điều kiện hỗn hợp",
    titleEn: "Third and mixed conditionals",
    summary:
      "Học cách nói về những điều không xảy ra trong quá khứ (loại 3) và cách “trộn” quá khứ với hiện tại (câu điều kiện hỗn hợp). Cuối bài có bảng tổng hợp câu điều kiện loại 0–3.",
    sections: [
      {
        heading: "Câu điều kiện loại 3 dùng khi nào?",
        text:
          "Câu điều kiện loại 3 dùng để tưởng tượng một quá khứ khác với sự thật và kết quả (cũng ở quá khứ) của nó. Vì quá khứ không thể thay đổi, câu loại 3 thường mang ý tiếc nuối, trách móc hoặc nhẹ nhõm.",
        points: [
          "Điều kiện: trái với sự thật trong quá khứ (thực tế việc đó đã không xảy ra, hoặc đã xảy ra).",
          "Kết quả: cũng là một điều không có thật trong quá khứ.",
          "Ví dụ: If I had left earlier, I wouldn't have missed the train. → Thực tế: tôi đã không đi sớm, nên tôi đã lỡ tàu.",
        ],
      },
      {
        heading: "Công thức loại 3",
        formulas: [
          { label: "Loại 3", pattern: "If + S + had + V3, S + would have + V3" },
          { label: "Phủ định", pattern: "If + S + hadn't + V3, S + wouldn't have + V3" },
          { label: "Khả năng / năng lực", pattern: "If + S + had + V3, S + could / might have + V3" },
          { label: "Đảo ngữ (trang trọng)", pattern: "Had + S + (not) + V3, S + would have + V3" },
        ],
        points: [
          "Mệnh đề if có thể đứng sau; khi đó thường không cần dấu phẩy: We would have helped you if you had asked.",
          "could have V3 = lẽ ra đã có thể; might have V3 = có lẽ đã.",
          "Trong văn nói, “had” và “would” đều có thể rút gọn thành ’d: If I’d known, I’d have told you.",
        ],
        examples: [
          { en: "If I had left earlier, I wouldn't have missed the train.", vi: "Nếu tôi đi sớm hơn thì tôi đã không lỡ chuyến tàu." },
          { en: "If she had studied harder, she would have passed the exam.", vi: "Nếu cô ấy học chăm hơn thì cô ấy đã đỗ kỳ thi." },
          { en: "We would have helped you if you had asked us.", vi: "Chúng tôi đã giúp bạn rồi nếu bạn hỏi chúng tôi." },
          { en: "If it hadn't rained, we could have played football.", vi: "Nếu trời không mưa thì chúng tôi đã có thể chơi bóng đá." },
          { en: "If they had taken a taxi, they might have arrived on time.", vi: "Nếu họ đi taxi thì có lẽ họ đã đến đúng giờ." },
          { en: "Had I known about the problem, I would have told you.", vi: "Nếu tôi biết về vấn đề đó thì tôi đã nói với bạn rồi.", note: "Đảo ngữ = If I had known..." },
        ],
      },
      {
        heading: "Câu điều kiện hỗn hợp (mixed conditionals)",
        text:
          "Câu hỗn hợp kết hợp hai mốc thời gian khác nhau: một vế nói về quá khứ, vế kia nói về hiện tại. Có hai kiểu thường gặp.",
        formulas: [
          { label: "Kiểu 1: quá khứ → hiện tại", pattern: "If + S + had + V3, S + would + V (now)" },
          { label: "Kiểu 2: hiện tại → quá khứ", pattern: "If + S + V2 / were, S + would have + V3" },
        ],
        points: [
          "Kiểu 1: một việc trong quá khứ (không có thật) dẫn đến kết quả khác ở hiện tại. Thường có now, today, still.",
          "Kiểu 2: một sự thật/đặc điểm luôn đúng ở hiện tại (tính cách, khả năng, hoàn cảnh) dẫn đến kết quả khác trong quá khứ.",
        ],
        examples: [
          { en: "If I had taken that job in Hanoi, I would be living there now.", vi: "Nếu hồi đó tôi nhận công việc ở Hà Nội thì bây giờ tôi đang sống ở đó rồi.", note: "Kiểu 1: quá khứ → hiện tại." },
          { en: "If you hadn't eaten so much, you wouldn't feel sick now.", vi: "Nếu bạn không ăn nhiều như vậy thì giờ bạn đã không thấy khó chịu.", note: "Kiểu 1." },
          { en: "If I spoke French, I would have applied for that job in Paris.", vi: "Nếu tôi biết nói tiếng Pháp thì tôi đã nộp đơn vào công việc đó ở Paris rồi.", note: "Kiểu 2: tôi (vẫn) không biết tiếng Pháp → quá khứ đã không nộp đơn." },
          { en: "If she weren't so shy, she would have talked to him at the party.", vi: "Nếu cô ấy không nhút nhát như vậy thì cô ấy đã nói chuyện với anh ấy ở bữa tiệc.", note: "Kiểu 2: tính nhút nhát là đặc điểm lâu dài." },
        ],
      },
      {
        heading: "Lưu ý quan trọng",
        points: [
          "Không dùng would trong mệnh đề if: ✗ If I would have known → ✓ If I had known.",
          "Sau had luôn là V3 (quá khứ phân từ): had gone, had known, had seen — không phải had went, had knew.",
          "Đảo ngữ phủ định: Had I not known... (không nói ✗ Hadn't I known...).",
          "Muốn biết dùng loại 3 hay hỗn hợp, hãy hỏi từng vế: “vế này nói về quá khứ hay hiện tại?” rồi chọn thì tương ứng.",
          "’d có thể là had hoặc would: If I’d (= had) seen him, I’d (= would) have said hello.",
        ],
      },
      {
        heading: "Bảng tổng hợp câu điều kiện loại 0–3 và hỗn hợp",
        table: {
          head: ["Loại", "Mệnh đề if", "Mệnh đề chính", "Dùng khi", "Ví dụ"],
          rows: [
            ["Loại 0", "If + S + V(s/es)", "S + V(s/es)", "Sự thật, quy luật luôn đúng", "If you heat ice, it melts."],
            ["Loại 1", "If + S + V(s/es)", "S + will + V", "Có thể xảy ra ở hiện tại/tương lai", "If it rains, I'll stay at home."],
            ["Loại 2", "If + S + V2 / were", "S + would + V", "Không có thật ở hiện tại / khó xảy ra ở tương lai", "If I had more money, I'd buy a car."],
            ["Loại 3", "If + S + had + V3", "S + would have + V3", "Không có thật trong quá khứ", "If I had known, I would have come."],
            ["Hỗn hợp 1", "If + S + had + V3", "S + would + V", "Quá khứ khác → hiện tại khác", "If I had saved money, I'd be rich now."],
            ["Hỗn hợp 2", "If + S + V2 / were", "S + would have + V3", "Hiện tại khác → quá khứ khác", "If I were braver, I'd have said no."],
          ],
        },
      },
    ],
    mistakes: [
      {
        wrong: "If I would have known, I would have told you.",
        right: "If I had known, I would have told you.",
        why: "Không dùng would trong mệnh đề if. Vế if của loại 3 dùng had + V3.",
      },
      {
        wrong: "If she had went to bed early, she wouldn't have been so tired.",
        right: "If she had gone to bed early, she wouldn't have been so tired.",
        why: "Sau had phải là V3 (gone), không phải V2 (went).",
      },
      {
        wrong: "If he studied harder last year, he would have passed.",
        right: "If he had studied harder last year, he would have passed.",
        why: "Điều kiện nói về quá khứ (last year) nên phải dùng had + V3, không dùng V2.",
      },
      {
        wrong: "If I had taken the medicine, I would have felt better now.",
        right: "If I had taken the medicine, I would feel better now.",
        why: "Kết quả ở hiện tại (now) nên dùng would + V — đây là câu điều kiện hỗn hợp kiểu 1.",
      },
      {
        wrong: "We would had come if you had invited us.",
        right: "We would have come if you had invited us.",
        why: "Sau would luôn là động từ nguyên mẫu: would have + V3, không phải would had.",
      },
    ],
    exercises: [
      {
        kind: "choice",
        question: "If you ___ me, I would have come to the party.",
        options: ["invited", "had invited", "would invite", "have invited"],
        answer: 1,
        explain:
          "Kết quả “would have come” là loại 3 (quá khứ), nên vế if dùng had + V3: had invited. “invited” (V2) dùng cho loại 2.",
      },
      {
        kind: "choice",
        question: "If I had won the lottery last year, I ___ in this tiny flat now.",
        options: ["wouldn't have lived", "won't live", "wouldn't live", "hadn't lived"],
        answer: 2,
        explain:
          "Điều kiện ở quá khứ (last year) nhưng kết quả ở hiện tại (now) → câu hỗn hợp kiểu 1: would + V. “wouldn't have lived” nói về quá khứ, không hợp với “now”.",
      },
      {
        kind: "choice",
        question: "Tom is a very lazy person. If he ___ so lazy, he would have finished the project on time.",
        options: ["weren't", "hadn't", "wouldn't be", "isn't"],
        answer: 0,
        explain:
          "Lười là đặc điểm lâu dài ở hiện tại → câu hỗn hợp kiểu 2: If + V2/were, would have + V3. “hadn't” thiếu động từ, “wouldn't be” sai vì không dùng would trong vế if.",
      },
      {
        kind: "choice",
        question: "___ the weather forecast, we wouldn't have gone hiking in the storm.",
        options: ["If we checked", "Had we checked", "If we would check", "Have we checked"],
        answer: 1,
        explain:
          "Đảo ngữ loại 3: Had + S + V3 = If we had checked. “If we checked” là loại 2, không hợp với “wouldn't have gone”.",
      },
      {
        kind: "choice",
        question: "If you heat ice, it ___.",
        options: ["would have melted", "melted", "would melt", "melts"],
        answer: 3,
        explain:
          "Đây là sự thật khoa học luôn đúng → câu điều kiện loại 0: hai vế đều dùng hiện tại đơn.",
      },
      {
        kind: "fill",
        question: "If I ___ about the meeting, I would have come.",
        hint: "know",
        answers: ["had known", "'d known"],
        explain: "Vế chính “would have come” là loại 3, nên vế if dùng had + V3: had known (know – knew – known).",
      },
      {
        kind: "fill",
        question: "We ___ the match if our best player hadn't been injured.",
        hint: "not / lose",
        answers: ["wouldn't have lost", "would not have lost"],
        explain: "Vế if dùng had + V3 (quá khứ) → vế chính loại 3: wouldn't have + V3 (lost).",
      },
      {
        kind: "fill",
        question: "If she had taken the medicine yesterday, she ___ better now.",
        hint: "feel",
        answers: ["would feel", "'d feel", "might feel", "could feel"],
        explain:
          "Điều kiện ở quá khứ (yesterday), kết quả ở hiện tại (now) → câu hỗn hợp kiểu 1: would + V. Không dùng “would have felt” vì có “now”.",
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // 2. Advanced passive
  // ---------------------------------------------------------------------------
  {
    id: "b2-passive-advanced",
    level: "B2",
    title: "Câu bị động nâng cao",
    titleEn: "Advanced passive forms",
    summary:
      "Mở rộng câu bị động: động từ có hai tân ngữ, bị động với động từ tường thuật (It is said that... / He is said to...), bị động của V-ing và to V, và bị động với động từ khuyết thiếu (kể cả modal perfect).",
    sections: [
      {
        heading: "Ôn nhanh và khi nào dùng",
        text:
          "Câu bị động luôn có dạng be + V3, trong đó “be” chia theo thì hoặc theo cấu trúc đứng trước. Ở trình độ B2, bạn cần dùng bị động trong những cấu trúc phức tạp hơn — đặc biệt hay gặp trong tin tức, văn viết học thuật và bài thi.",
        points: [
          "Dùng bị động khi người thực hiện không quan trọng, không rõ, hoặc hiển nhiên.",
          "Dùng bị động để đưa thông tin “cũ”/chủ đề chính lên đầu câu.",
          "Bị động với động từ tường thuật giúp diễn đạt thông tin một cách khách quan, không nói rõ ai nói (rất phổ biến trên báo chí).",
        ],
      },
      {
        heading: "Động từ có hai tân ngữ",
        text:
          "Các động từ như give, send, offer, show, tell, teach, lend, pay, promise, award có hai tân ngữ: người nhận và vật. Vì vậy có hai cách chuyển sang bị động.",
        formulas: [
          { label: "Chủ động", pattern: "S + V + sb + sth" },
          { label: "Bị động 1 (phổ biến hơn)", pattern: "Sb + be + V3 + sth" },
          { label: "Bị động 2", pattern: "Sth + be + V3 + to / for + sb" },
        ],
        points: [
          "Trong tiếng Anh, cách lấy người làm chủ ngữ (I was given...) thường tự nhiên hơn.",
          "Một số động từ KHÔNG dùng người làm chủ ngữ bị động: explain, describe, suggest, say, introduce. ✓ The rules were explained to me. ✗ I was explained the rules.",
        ],
        examples: [
          { en: "I was given a new laptop for my birthday.", vi: "Tôi được tặng một chiếc laptop mới nhân dịp sinh nhật." },
          { en: "A new laptop was given to me for my birthday.", vi: "Một chiếc laptop mới đã được tặng cho tôi nhân dịp sinh nhật." },
          { en: "She has been offered a job in Singapore.", vi: "Cô ấy vừa được mời làm việc ở Singapore." },
          { en: "We were shown around the factory by the manager.", vi: "Chúng tôi được quản lý dẫn đi tham quan nhà máy." },
          { en: "The situation was explained to the students.", vi: "Tình hình đã được giải thích cho các sinh viên.", note: "Không nói: The students were explained the situation." },
        ],
      },
      {
        heading: "Bị động với động từ tường thuật (say, believe, think...)",
        text:
          "Với các động từ say, believe, think, know, report, expect, consider, claim, understand, allege, ta có hai cấu trúc bị động.",
        formulas: [
          { label: "Cấu trúc 1", pattern: "It + be + V3 + that + S + V" },
          { label: "Cấu trúc 2 – cùng thời điểm", pattern: "S + be + V3 + to + V" },
          { label: "Cấu trúc 2 – đang diễn ra", pattern: "S + be + V3 + to be + V-ing" },
          { label: "Cấu trúc 2 – xảy ra trước", pattern: "S + be + V3 + to have + V3" },
        ],
        points: [
          "Dùng to + V khi sự việc xảy ra cùng lúc với lời nói/niềm tin.",
          "Dùng to have + V3 khi sự việc xảy ra TRƯỚC thời điểm nói/tin.",
          "“be” trong be + V3 chia theo thời điểm nói/tin: is said (bây giờ người ta nói), was believed (hồi đó người ta tin).",
        ],
        examples: [
          { en: "It is said that he is very rich. → He is said to be very rich.", vi: "Người ta nói rằng anh ấy rất giàu." },
          { en: "It is believed that the thief escaped through the window. → The thief is believed to have escaped through the window.", vi: "Người ta tin rằng tên trộm đã trốn thoát qua cửa sổ." },
          { en: "People say that she is writing a new book. → She is said to be writing a new book.", vi: "Người ta nói rằng cô ấy đang viết một cuốn sách mới." },
          { en: "It was thought that the earth was flat.", vi: "Người ta từng nghĩ rằng trái đất phẳng." },
          { en: "It is reported that two people were injured in the accident.", vi: "Theo tin báo, có hai người bị thương trong vụ tai nạn." },
          { en: "The company is expected to announce its results next week.", vi: "Công ty được dự đoán sẽ công bố kết quả vào tuần tới." },
        ],
      },
      {
        heading: "Bị động của V-ing và to V; bị động với modal",
        formulas: [
          { label: "Bị động của V-ing", pattern: "being + V3" },
          { label: "Bị động của to V", pattern: "to be + V3" },
          { label: "Modal + bị động", pattern: "modal + be + V3" },
          { label: "Modal perfect + bị động", pattern: "modal + have been + V3" },
        ],
        points: [
          "being + V3 dùng ở chỗ cần V-ing: sau giới từ (without, after, before...) và sau các động từ như enjoy, avoid, mind, hate, remember.",
          "to be + V3 dùng ở chỗ cần to V: sau want, expect, hope, refuse, would like, need...",
          "Modal perfect bị động (should have been done, must have been done...) nói về quá khứ.",
        ],
        examples: [
          { en: "She hates being told what to do.", vi: "Cô ấy ghét bị người khác bảo phải làm gì." },
          { en: "He left the building without being seen.", vi: "Anh ta rời khỏi tòa nhà mà không bị ai nhìn thấy." },
          { en: "Everyone wants to be loved.", vi: "Ai cũng muốn được yêu thương." },
          { en: "I expect to be promoted next year.", vi: "Tôi hy vọng sẽ được thăng chức vào năm sau." },
          { en: "The work must be finished by Friday.", vi: "Công việc phải được hoàn thành trước thứ Sáu." },
          { en: "The letter should have been sent yesterday.", vi: "Lẽ ra lá thư đã phải được gửi đi từ hôm qua." },
          { en: "The window might have been broken by the wind.", vi: "Có lẽ cửa sổ đã bị gió làm vỡ." },
        ],
      },
      {
        heading: "Bảng chuyển đổi chủ động → bị động",
        table: {
          head: ["Cấu trúc", "Chủ động", "Bị động"],
          rows: [
            ["Hai tân ngữ", "They gave me a prize.", "I was given a prize. / A prize was given to me."],
            ["Tường thuật (cùng lúc)", "People say he is rich.", "It is said that he is rich. / He is said to be rich."],
            ["Tường thuật (trước đó)", "People think he stole it.", "It is thought that he stole it. / He is thought to have stolen it."],
            ["V-ing", "I don't like people interrupting me.", "I don't like being interrupted."],
            ["to V", "I want someone to help me.", "I want to be helped."],
            ["Modal", "We must finish the work.", "The work must be finished."],
            ["Modal perfect", "They should have repaired it.", "It should have been repaired."],
          ],
        },
      },
    ],
    mistakes: [
      {
        wrong: "I was explained the problem.",
        right: "The problem was explained to me.",
        why: "explain không dùng người nhận làm chủ ngữ bị động. Phải dùng: sth + be explained + to sb.",
      },
      {
        wrong: "He is said to steal the car last night.",
        right: "He is said to have stolen the car last night.",
        why: "Việc lấy trộm xảy ra trước thời điểm “người ta nói” nên dùng to have + V3.",
      },
      {
        wrong: "It is said him to be very rich.",
        right: "He is said to be very rich. / It is said that he is very rich.",
        why: "Không trộn hai cấu trúc: hoặc It is said that + mệnh đề, hoặc S + is said + to V.",
      },
      {
        wrong: "She left without seen.",
        right: "She left without being seen.",
        why: "Sau giới từ (without) cần V-ing; dạng bị động của V-ing là being + V3.",
      },
      {
        wrong: "The report should have finished yesterday.",
        right: "The report should have been finished yesterday.",
        why: "Bản báo cáo không tự hoàn thành — nó được (ai đó) hoàn thành, nên cần dạng bị động: should have been + V3.",
      },
    ],
    exercises: [
      {
        kind: "choice",
        question: "I ___ a beautiful watch by my parents when I graduated.",
        options: ["gave", "was given", "was giving", "have given"],
        answer: 1,
        explain: "Tôi là người nhận → bị động với động từ hai tân ngữ: S + was given + sth.",
      },
      {
        kind: "choice",
        question: "The suspect is believed ___ the country last week.",
        options: ["to leave", "leaving", "to be left", "to have left"],
        answer: 3,
        explain:
          "Việc rời khỏi đất nước xảy ra trước (last week) thời điểm “người ta tin” (hiện tại) → to have + V3.",
      },
      {
        kind: "choice",
        question: "She hates ___ by her boss in front of other people.",
        options: ["criticising", "to criticise", "being criticised", "been criticised"],
        answer: 2,
        explain:
          "Có “by her boss” nên cần nghĩa bị động; sau hate dùng V-ing → being + V3. “criticising” là chủ động (cô ấy chỉ trích người khác).",
      },
      {
        kind: "choice",
        question: "The bridge ___ years ago — now it's in terrible condition.",
        options: ["should have been repaired", "should be repaired", "should have repaired", "should repair"],
        answer: 0,
        explain:
          "Nói về việc lẽ ra phải làm trong quá khứ (years ago) và cây cầu được sửa → bị động của modal perfect: should have been + V3.",
      },
      {
        kind: "choice",
        question: "___ that the company will cut 200 jobs next year.",
        options: ["It reports", "It is reported", "They are reported", "It is reporting"],
        answer: 1,
        explain: "Cấu trúc bị động tường thuật: It + is + V3 + that + mệnh đề.",
      },
      {
        kind: "fill",
        question: "People believe that the painting is worth millions. → The painting is believed ___ worth millions.",
        hint: "be",
        answers: ["to be"],
        explain: "Sự việc (đáng giá hàng triệu) đúng ở cùng thời điểm với niềm tin → S + is believed + to + V.",
      },
      {
        kind: "fill",
        question: "He walked out of the shop without ___.",
        hint: "notice",
        answers: ["being noticed"],
        explain: "Sau giới từ without cần V-ing; anh ta không bị ai để ý → bị động: being + V3.",
      },
      {
        kind: "fill",
        question: "My bike isn't where I left it. It must ___ while I was in the shop.",
        hint: "steal",
        answers: ["have been stolen"],
        explain:
          "Suy luận chắc chắn về quá khứ (must have) + chiếc xe bị lấy trộm (bị động) → must have been + V3 (stolen).",
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // 3. Causative
  // ---------------------------------------------------------------------------
  {
    id: "b2-causative",
    level: "B2",
    title: "Thể sai khiến (have / get something done)",
    titleEn: "Causative: have / get something done",
    summary:
      "Học cách nói việc mình nhờ/thuê người khác làm (have/get something done), cách nói nhờ ai làm gì (have someone do / get someone to do), và cách nói về sự việc không may xảy ra với mình (She had her bag stolen).",
    sections: [
      {
        heading: "Thể sai khiến là gì?",
        text:
          "Thể sai khiến dùng khi chúng ta không tự làm một việc mà sắp xếp, nhờ hoặc thuê người khác làm cho mình. Tiếng Việt thường nói “đi cắt tóc”, “mang xe đi sửa” — tiếng Anh cần cấu trúc have/get + something + V3.",
        examples: [
          { en: "I cut my hair.", vi: "Tôi tự cắt tóc cho mình.", note: "Tự mình làm." },
          { en: "I had my hair cut.", vi: "Tôi đã đi cắt tóc (thợ cắt cho tôi).", note: "Người khác làm cho mình." },
        ],
      },
      {
        heading: "Công thức",
        formulas: [
          { label: "Nhờ/thuê làm (bị động)", pattern: "S + have + sth + V3" },
          { label: "Như trên, thân mật hơn", pattern: "S + get + sth + V3" },
          { label: "Nhờ/giao việc cho ai", pattern: "S + have + sb + V" },
          { label: "Thuyết phục ai làm", pattern: "S + get + sb + to V" },
        ],
        points: [
          "have/get được chia theo thì như động từ thường: I'm having my car repaired, I had it repaired, I'll get it repaired, I've just had it repaired.",
          "Câu hỏi và phủ định dùng trợ động từ: Where did you have your hair cut? I didn't get it fixed.",
          "Trật tự: have + VẬT + V3 — không phải have + V3 + vật.",
        ],
      },
      {
        heading: "Các cách dùng thường gặp",
        examples: [
          { en: "I had my hair cut yesterday.", vi: "Hôm qua tôi đi cắt tóc." },
          { en: "We're having our house painted next week.", vi: "Tuần sau chúng tôi sẽ cho người sơn lại nhà." },
          { en: "You should get your eyes tested.", vi: "Bạn nên đi kiểm tra mắt." },
          { en: "Where did you have your photos printed?", vi: "Bạn rửa ảnh ở đâu vậy?" },
          { en: "I'll have the receptionist call you a taxi.", vi: "Tôi sẽ bảo lễ tân gọi taxi cho anh.", note: "have + sb + V: giao việc cho người có trách nhiệm làm." },
          { en: "I got my brother to help me move the sofa.", vi: "Tôi đã nhờ được anh trai giúp chuyển cái ghế sofa.", note: "get + sb + to V: thường hàm ý phải thuyết phục." },
          { en: "I need to get this report finished by Friday.", vi: "Tôi cần làm xong bản báo cáo này trước thứ Sáu.", note: "get sth done còn có nghĩa “tự hoàn thành việc gì”." },
        ],
      },
      {
        heading: "Sự việc không may (không chủ ý)",
        text:
          "Cấu trúc have + sth + V3 còn dùng để nói về điều không may xảy ra với ai đó — chủ ngữ là người chịu ảnh hưởng, không phải người sắp xếp.",
        examples: [
          { en: "She had her bag stolen on the bus.", vi: "Cô ấy bị trộm mất túi trên xe buýt." },
          { en: "He had his nose broken in a fight.", vi: "Anh ta bị đánh gãy mũi trong một trận đánh nhau." },
          { en: "We had our roof damaged in the storm.", vi: "Mái nhà của chúng tôi bị hư hại trong cơn bão." },
        ],
      },
      {
        heading: "So sánh have / get / make / let",
        table: {
          head: ["Cấu trúc", "Nghĩa", "Ví dụ"],
          rows: [
            ["have + sth + V3", "Nhờ/thuê ai đó làm việc gì (hoặc bị việc gì không may)", "I had my phone repaired."],
            ["get + sth + V3", "Như trên, thân mật hơn", "I got my phone repaired."],
            ["have + sb + V", "Giao việc, yêu cầu (thường là người làm dịch vụ, cấp dưới)", "I had the mechanic check the brakes."],
            ["get + sb + to V", "Thuyết phục, nhờ được ai làm gì", "I got my friend to lend me his car."],
            ["make + sb + V", "Bắt ai làm gì", "My mum made me clean my room."],
            ["let + sb + V", "Cho phép ai làm gì", "My dad let me drive his car."],
          ],
        },
      },
    ],
    mistakes: [
      {
        wrong: "I cut my hair at the hairdresser's yesterday.",
        right: "I had my hair cut at the hairdresser's yesterday.",
        why: "Thợ cắt tóc cắt cho bạn, bạn không tự cắt → dùng have + sth + V3.",
      },
      {
        wrong: "I had my car repair last week.",
        right: "I had my car repaired last week.",
        why: "Sau tân ngữ (my car) phải là V3 (repaired) vì chiếc xe “được sửa”.",
      },
      {
        wrong: "I got my friend fix my computer.",
        right: "I got my friend to fix my computer.",
        why: "get + người + to V. Chỉ have + người mới đi với V nguyên mẫu.",
      },
      {
        wrong: "I had him to call the customer.",
        right: "I had him call the customer.",
        why: "have + người + V nguyên mẫu (không có to).",
      },
      {
        wrong: "I had repaired my watch.",
        right: "I had my watch repaired.",
        why: "Sai trật tự: “had repaired my watch” là quá khứ hoàn thành (tự sửa). Thể sai khiến là have + vật + V3.",
      },
    ],
    exercises: [
      {
        kind: "choice",
        question: "My hair is too long. I'm going to the hairdresser's to ___.",
        options: ["cut my hair", "have my hair cut", "have cut my hair", "have my hair cutting"],
        answer: 1,
        explain: "Thợ cắt tóc làm cho mình → have + sth + V3: have my hair cut.",
      },
      {
        kind: "choice",
        question: "I couldn't fix the printer, so I got my colleague ___ at it.",
        options: ["look", "looked", "to look"],
        answer: 2,
        explain: "get + sb + to V. “look” chỉ đúng nếu dùng have (had my colleague look at it).",
      },
      {
        kind: "choice",
        question: "The manager had his assistant ___ all the clients about the change.",
        options: ["call", "to call", "calls"],
        answer: 0,
        explain: "have + sb + V nguyên mẫu (không có to): had his assistant call.",
      },
      {
        kind: "choice",
        question: "Mark ___ on the way home from work last night.",
        options: ["stole his phone", "had stolen his phone", "got stolen his phone", "had his phone stolen"],
        answer: 3,
        explain:
          "Nói về việc không may: have + sth + V3 → had his phone stolen (bị trộm điện thoại). “had stolen his phone” nghĩa là Mark tự lấy trộm điện thoại của mình — vô lý.",
      },
      {
        kind: "choice",
        question: "When was the last time you ___ by an optician?",
        options: ["had your eyes tested", "tested your eyes", "had tested your eyes", "had your eyes test"],
        answer: 0,
        explain: "Bác sĩ đo mắt kiểm tra cho bạn → have + sth + V3: had your eyes tested.",
      },
      {
        kind: "fill",
        question: "We're ___ next week, so the living room will be a mess.",
        hint: "our house / paint",
        answers: ["having our house painted", "getting our house painted"],
        explain: "Thuê thợ sơn nhà, kế hoạch tương lai gần → be + having + sth + V3 (painted).",
      },
      {
        kind: "fill",
        question: "She's very persuasive — she finally got her dad ___ her a new phone.",
        hint: "buy",
        answers: ["to buy"],
        explain: "get + sb + to V: thuyết phục được ai làm gì.",
      },
      {
        kind: "fill",
        question: "Our car broke down, so we ___ at the garage near our house.",
        hint: "it / repair",
        answers: ["had it repaired", "got it repaired"],
        explain: "Thợ sửa xe sửa cho mình, việc trong quá khứ → had/got + it + V3 (repaired).",
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // 4. Advanced relative clauses
  // ---------------------------------------------------------------------------
  {
    id: "b2-relative-advanced",
    level: "B2",
    title: "Mệnh đề quan hệ nâng cao",
    titleEn: "Advanced relative clauses",
    summary:
      "Phân biệt mệnh đề quan hệ xác định và không xác định, dùng which để thay cho cả mệnh đề, giới từ + which/whom, và cách rút gọn mệnh đề quan hệ bằng V-ing, V3 và to V.",
    sections: [
      {
        heading: "Mệnh đề xác định và không xác định",
        text:
          "Mệnh đề quan hệ xác định cho biết ta đang nói về người/vật NÀO — bỏ đi thì câu mất nghĩa. Mệnh đề không xác định chỉ thêm thông tin phụ về một người/vật đã rõ — bỏ đi câu vẫn đủ nghĩa.",
        points: [
          "Mệnh đề không xác định luôn được tách bằng dấu phẩy (hoặc hai dấu phẩy nếu nằm giữa câu).",
          "Trong mệnh đề không xác định KHÔNG dùng that và KHÔNG được lược bỏ đại từ quan hệ.",
          "Thường gặp sau tên riêng, sau danh từ có my/his/this..., hoặc khi chỉ có một người/vật duy nhất.",
        ],
        examples: [
          { en: "The man who lives next door is a doctor.", vi: "Người đàn ông sống ở nhà bên cạnh là bác sĩ.", note: "Xác định: cho biết người đàn ông nào." },
          { en: "My brother, who lives in Da Nang, is a doctor.", vi: "Anh trai tôi, người sống ở Đà Nẵng, là bác sĩ.", note: "Không xác định: chỉ thêm thông tin." },
          { en: "Hanoi, which is the capital of Vietnam, is famous for its street food.", vi: "Hà Nội, thủ đô của Việt Nam, nổi tiếng với ẩm thực đường phố." },
          { en: "I met Lan, whose father owns a restaurant.", vi: "Tôi đã gặp Lan, người có bố làm chủ một nhà hàng." },
        ],
      },
      {
        heading: "which thay cho cả mệnh đề phía trước",
        text:
          "which có thể thay cho cả một ý/sự việc đã nói trước đó (không chỉ một danh từ). Trường hợp này luôn có dấu phẩy trước which.",
        formulas: [{ label: "which thay cả mệnh đề", pattern: "S + V + O, which + V..." }],
        points: [
          "Không dùng what hay that trong trường hợp này: ✗ He was late, what annoyed me.",
        ],
        examples: [
          { en: "She didn't call me back, which annoyed me.", vi: "Cô ấy không gọi lại cho tôi, điều đó làm tôi bực mình." },
          { en: "He passed the exam, which surprised everyone.", vi: "Anh ấy đã thi đỗ, điều này làm mọi người bất ngờ." },
          { en: "The train was cancelled, which meant we had to take a bus.", vi: "Chuyến tàu bị hủy, điều đó có nghĩa là chúng tôi phải đi xe buýt." },
        ],
      },
      {
        heading: "Giới từ + which / whom và từ chỉ số lượng",
        formulas: [
          { label: "Trang trọng", pattern: "N + giới từ + which / whom + S + V" },
          { label: "Thân mật", pattern: "N + (which / who / that) + S + V + giới từ" },
          { label: "Số lượng", pattern: "some / many / most / all / none / both + of + whom / which" },
        ],
        points: [
          "Sau giới từ chỉ dùng which (vật) hoặc whom (người); không dùng ✗ giới từ + that, ✗ giới từ + who.",
          "Trong văn nói, người ta thường đặt giới từ ở cuối: the people I work with.",
          "Cấu trúc số lượng (two of whom, most of which...) dùng trong mệnh đề không xác định, có dấu phẩy.",
        ],
        examples: [
          { en: "The hotel at which we stayed was excellent.", vi: "Khách sạn chúng tôi đã ở rất tuyệt.", note: "Thân mật: The hotel (that) we stayed at..." },
          { en: "The people with whom I work are very friendly.", vi: "Những người làm việc cùng tôi rất thân thiện." },
          { en: "I have three brothers, two of whom live abroad.", vi: "Tôi có ba anh trai, hai người trong số đó sống ở nước ngoài." },
          { en: "He gave me some advice, most of which was useless.", vi: "Anh ấy cho tôi vài lời khuyên, phần lớn trong số đó vô dụng." },
        ],
      },
      {
        heading: "Rút gọn mệnh đề quan hệ",
        text:
          "Khi đại từ quan hệ (who/which/that) làm CHỦ NGỮ của mệnh đề, ta có thể rút gọn mệnh đề.",
        formulas: [
          { label: "Chủ động → V-ing", pattern: "N + who/which + V... → N + V-ing..." },
          { label: "Bị động → V3", pattern: "N + who/which + be + V3... → N + V3..." },
          { label: "Sau the first/last/only, so sánh nhất → to V", pattern: "the first / last / only / next + N + to V" },
        ],
        points: [
          "V-ing dùng cho hành động đang diễn ra hoặc đặc điểm lâu dài: the road joining the two villages. Với một hành động đơn lẻ đã xong trong quá khứ, thường giữ nguyên mệnh đề: The man who stole my bag was arrested.",
          "Không rút gọn khi đại từ quan hệ là tân ngữ: the book (that) I bought — chỉ có thể bỏ that.",
          "Mệnh đề không xác định cũng rút gọn được: The painting, painted in 1890, is worth millions.",
        ],
        examples: [
          { en: "The woman sitting next to me was very talkative.", vi: "Người phụ nữ ngồi cạnh tôi nói rất nhiều.", note: "= who was sitting" },
          { en: "Most of the goods made in this factory are exported.", vi: "Phần lớn hàng hóa được sản xuất ở nhà máy này được xuất khẩu.", note: "= which are made" },
          { en: "Neil Armstrong was the first person to walk on the moon.", vi: "Neil Armstrong là người đầu tiên đi bộ trên mặt trăng.", note: "= who walked" },
          { en: "Anyone wanting to join the club should contact Mr Nam.", vi: "Bất kỳ ai muốn tham gia câu lạc bộ nên liên hệ thầy Nam." },
        ],
      },
      {
        heading: "Bảng so sánh: xác định và không xác định",
        table: {
          head: ["Đặc điểm", "Xác định", "Không xác định"],
          rows: [
            ["Chức năng", "Xác định người/vật nào", "Thêm thông tin phụ"],
            ["Dấu phẩy", "Không", "Có"],
            ["Dùng that", "Được", "Không"],
            ["Bỏ đại từ (khi là tân ngữ)", "Được: the film (that) I saw", "Không được"],
            ["which thay cả mệnh đề", "Không", "Có: ..., which surprised me."],
            ["Ví dụ", "Students who study hard usually pass.", "My sister, who studies hard, always passes."],
          ],
        },
      },
    ],
    mistakes: [
      {
        wrong: "My mother, that is a teacher, loves reading.",
        right: "My mother, who is a teacher, loves reading.",
        why: "Mệnh đề không xác định (có dấu phẩy) không dùng that.",
      },
      {
        wrong: "He was late again, what made me angry.",
        right: "He was late again, which made me angry.",
        why: "Thay cho cả mệnh đề phía trước phải dùng “, which”, không dùng what.",
      },
      {
        wrong: "The man to who I spoke was very helpful.",
        right: "The man to whom I spoke was very helpful.",
        why: "Sau giới từ dùng whom (cho người), không dùng who hay that.",
      },
      {
        wrong: "This is the house which I grew up.",
        right: "This is the house which I grew up in. / This is the house in which I grew up.",
        why: "grow up in a house — không được bỏ mất giới từ.",
      },
      {
        wrong: "The girl who standing over there is my cousin.",
        right: "The girl standing over there is my cousin. / The girl who is standing over there is my cousin.",
        why: "Khi rút gọn phải bỏ cả who lẫn be; nếu giữ who thì phải có động từ chia (is standing).",
      },
    ],
    exercises: [
      {
        kind: "choice",
        question: "My sister, ___ works in a bank, is coming to visit next week.",
        options: ["that", "who", "which", "whom"],
        answer: 1,
        explain:
          "Mệnh đề không xác định (có dấu phẩy), chỉ người, làm chủ ngữ → who. Không dùng that sau dấu phẩy; whom chỉ dùng cho tân ngữ.",
      },
      {
        kind: "choice",
        question: "He didn't apologise, ___ made me even angrier.",
        options: ["that", "what", "who", "which"],
        answer: 3,
        explain: "which thay cho cả sự việc “anh ta không xin lỗi”. Không dùng what/that trong trường hợp này.",
      },
      {
        kind: "choice",
        question: "The colleague ___ I share an office is from Canada.",
        options: ["with whom", "with that", "whom with", "with who"],
        answer: 0,
        explain: "share an office with sb → giới từ + whom. Sau giới từ không dùng that hoặc who.",
      },
      {
        kind: "choice",
        question: "She was the only student ___ the answer.",
        options: ["knew", "knowing", "to know", "knows"],
        answer: 2,
        explain: "Sau the only / the first / the last + danh từ, mệnh đề quan hệ rút gọn bằng to V.",
      },
      {
        kind: "choice",
        question: "Most of the people ___ to the wedding were relatives.",
        options: ["inviting", "invited", "to invite", "were invited"],
        answer: 1,
        explain:
          "Những người “được mời” → nghĩa bị động → rút gọn bằng V3 (= who were invited). “were invited” sai vì câu đã có động từ chính “were”.",
      },
      {
        kind: "fill",
        question: "I have two cousins, both of ___ are engineers.",
        hint: "who",
        answers: ["whom"],
        explain: "Sau giới từ of, chỉ người → whom (both of whom).",
      },
      {
        kind: "fill",
        question: "The woman ___ next to me on the bus talked on her phone the whole time.",
        hint: "sit",
        answers: ["sitting", "who was sitting", "that was sitting", "who sat", "that sat"],
        explain:
          "Rút gọn mệnh đề quan hệ chủ động bằng V-ing: sitting (= who was sitting). Viết đầy đủ “who was sitting” cũng đúng.",
      },
      {
        kind: "fill",
        question: "This is the house ___ my grandparents used to live.",
        hint: "giới từ + which",
        answers: ["in which", "where"],
        explain: "live in a house → giới từ đặt trước which: in which (= where).",
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // 5. Reporting verbs
  // ---------------------------------------------------------------------------
  {
    id: "b2-reporting-verbs",
    level: "B2",
    title: "Động từ tường thuật và cấu trúc theo sau",
    titleEn: "Reporting verbs and their patterns",
    summary:
      "Thay vì chỉ dùng say/tell, ta dùng các động từ tường thuật như suggest, advise, promise, deny, accuse... để diễn đạt chính xác ý người nói. Mỗi động từ đi với một cấu trúc riêng mà bạn cần học thuộc.",
    sections: [
      {
        heading: "Vì sao cần động từ tường thuật?",
        text:
          "Khi tường thuật, ta thường không chép lại từng chữ mà tóm tắt CHỨC NĂNG của câu nói: khuyên, hứa, từ chối, xin lỗi, buộc tội... Mỗi động từ có “khuôn” riêng: + to V, + O + to V, + V-ing, hoặc + giới từ + V-ing.",
        examples: [
          { en: "\"I'll help you with your homework.\" → He offered to help me with my homework.", vi: "“Anh sẽ giúp em làm bài tập.” → Anh ấy đề nghị giúp tôi làm bài tập." },
          { en: "\"I'm sorry I'm late.\" → She apologised for being late.", vi: "“Xin lỗi tôi đến muộn.” → Cô ấy xin lỗi vì đến muộn." },
        ],
      },
      {
        heading: "Nhóm + to V và nhóm + O + to V",
        formulas: [
          { label: "S + V + to V", pattern: "offer / promise / refuse / agree / threaten / decide + to V" },
          { label: "S + V + O + to V", pattern: "advise / warn / remind / persuade / encourage / tell / ask / invite + sb + to V" },
          { label: "Phủ định", pattern: "... + not + to V (warn sb not to V, promise not to V)" },
        ],
        examples: [
          { en: "\"No, I won't lend you any money.\" → She refused to lend me any money.", vi: "Cô ấy từ chối cho tôi mượn tiền." },
          { en: "\"I'll call you tomorrow.\" → He promised to call me the next day.", vi: "Anh ấy hứa sẽ gọi cho tôi vào hôm sau." },
          { en: "\"You should see a doctor.\" → She advised me to see a doctor.", vi: "Cô ấy khuyên tôi đi khám bác sĩ." },
          { en: "\"Don't touch the wire!\" → He warned us not to touch the wire.", vi: "Anh ấy cảnh báo chúng tôi không được chạm vào sợi dây điện." },
          { en: "\"Don't forget to lock the door.\" → Mum reminded me to lock the door.", vi: "Mẹ nhắc tôi khóa cửa." },
          { en: "We finally persuaded him to come with us.", vi: "Cuối cùng chúng tôi cũng thuyết phục được anh ấy đi cùng." },
        ],
      },
      {
        heading: "Nhóm + V-ing và nhóm + giới từ + V-ing",
        formulas: [
          { label: "S + V + V-ing", pattern: "deny / admit / suggest / recommend + V-ing" },
          { label: "S + V + O + giới từ + V-ing", pattern: "accuse sb of / blame sb for / congratulate sb on / thank sb for + V-ing" },
          { label: "S + V + giới từ + V-ing", pattern: "apologise (to sb) for / insist on + V-ing" },
        ],
        points: [
          "deny và admit cũng dùng được với that + mệnh đề: He denied that he had taken it.",
          "Có thể dùng having + V3 để nhấn mạnh việc đã xảy ra trước: He admitted having taken the money.",
        ],
        examples: [
          { en: "\"I didn't break the vase.\" → Tom denied breaking the vase.", vi: "Tom chối là không làm vỡ cái bình." },
          { en: "\"Yes, I took the money.\" → He admitted taking the money.", vi: "Anh ta thừa nhận đã lấy tiền." },
          { en: "\"You cheated in the test!\" → The teacher accused Nam of cheating in the test.", vi: "Cô giáo buộc tội Nam gian lận trong bài kiểm tra." },
          { en: "\"It was you who lost the keys!\" → She blamed her husband for losing the keys.", vi: "Cô ấy đổ lỗi cho chồng vì làm mất chìa khóa." },
          { en: "\"I'll pay for dinner — I insist!\" → He insisted on paying for dinner.", vi: "Anh ấy nhất quyết đòi trả tiền bữa tối." },
        ],
      },
      {
        heading: "Đặc biệt: suggest và recommend",
        formulas: [
          { label: "+ V-ing", pattern: "suggest / recommend + V-ing" },
          { label: "+ mệnh đề", pattern: "suggest / recommend + (that) + S + (should) + V" },
        ],
        points: [
          "Trong mệnh đề sau suggest/recommend, động từ ở dạng nguyên mẫu dù chủ ngữ là ngôi thứ ba: She suggested that he go / he should go. Trong văn nói Anh-Anh cũng gặp thì thường: She suggested that he went.",
          "KHÔNG nói ✗ suggest sb to V. (recommend sb to V có gặp trong tiếng Anh-Anh trang trọng, nhưng cấu trúc an toàn nhất là recommend + V-ing hoặc + that.)",
          "Phân biệt: suggest + V-ing có thể bao gồm cả người nói (“mình cùng làm nhé”).",
        ],
        examples: [
          { en: "\"Let's go to the cinema.\" → She suggested going to the cinema.", vi: "Cô ấy gợi ý đi xem phim." },
          { en: "She suggested that we (should) go to the cinema.", vi: "Cô ấy đề nghị chúng tôi đi xem phim." },
          { en: "The doctor recommended that he (should) rest for a week.", vi: "Bác sĩ khuyên anh ấy nên nghỉ ngơi một tuần." },
        ],
      },
      {
        heading: "Bảng tổng hợp",
        table: {
          head: ["Cấu trúc", "Động từ", "Ví dụ"],
          rows: [
            ["+ to V", "offer, promise, refuse, agree, threaten", "He refused to help."],
            ["+ O + to V", "advise, warn, remind, persuade, encourage", "She reminded me to call."],
            ["+ V-ing", "deny, admit, suggest, recommend", "He denied stealing it."],
            ["+ (that) S (should) V", "suggest, recommend, insist", "I suggest that you (should) leave."],
            ["+ O + giới từ + V-ing", "accuse sb of, blame sb for, congratulate sb on", "They accused him of lying."],
            ["+ giới từ + V-ing", "apologise for, insist on", "She apologised for being late."],
          ],
        },
      },
    ],
    mistakes: [
      {
        wrong: "She suggested me to go to the dentist.",
        right: "She suggested (that) I (should) go to the dentist.",
        why: "suggest không đi với sb + to V. Dùng suggest + V-ing hoặc suggest + (that) + S + (should) + V.",
      },
      {
        wrong: "He denied to steal the money.",
        right: "He denied stealing the money.",
        why: "deny + V-ing (hoặc deny + that + mệnh đề), không dùng to V.",
      },
      {
        wrong: "They accused him for cheating.",
        right: "They accused him of cheating.",
        why: "accuse sb OF V-ing. (blame sb FOR V-ing mới dùng for.)",
      },
      {
        wrong: "I insisted to pay the bill.",
        right: "I insisted on paying the bill.",
        why: "insist on + V-ing.",
      },
      {
        wrong: "The teacher advised us not using our phones.",
        right: "The teacher advised us not to use our phones.",
        why: "advise + sb + (not) to V.",
      },
    ],
    exercises: [
      {
        kind: "choice",
        question: "My doctor suggested ___ less sugar.",
        options: ["me to eat", "to eat", "eating", "eat"],
        answer: 2,
        explain: "suggest + V-ing. Không dùng suggest + sb + to V hay suggest + to V.",
      },
      {
        kind: "choice",
        question: "The man denied ___ the car.",
        options: ["stealing", "to steal", "steal", "for stealing"],
        answer: 0,
        explain: "deny + V-ing: chối là không làm gì.",
      },
      {
        kind: "choice",
        question: "Her parents finally persuaded her ___ the job offer.",
        options: ["accepting", "accept", "for accepting", "to accept"],
        answer: 3,
        explain: "persuade + sb + to V.",
      },
      {
        kind: "choice",
        question: "The police accused him ___ the documents.",
        options: ["for destroying", "to destroy", "of destroying", "about destroying"],
        answer: 2,
        explain: "accuse sb of + V-ing. Học sinh Việt Nam hay nhầm với “for” vì blame sb for.",
      },
      {
        kind: "choice",
        question: "\"Don't swim too far from the beach,\" the lifeguard said. → The lifeguard warned us ___ too far from the beach.",
        options: ["not to swim", "not swimming", "don't swim", "to swim not"],
        answer: 0,
        explain: "warn + sb + not to V: cảnh báo ai không làm gì.",
      },
      {
        kind: "fill",
        question: "\"I'm sorry I broke your glasses.\" → Tom apologised ___ my glasses.",
        hint: "break",
        answers: ["for breaking", "for having broken"],
        explain: "apologise for + V-ing. Có thể dùng for having broken để nhấn mạnh việc đã xảy ra.",
      },
      {
        kind: "fill",
        question: "\"I'll carry your bag for you.\" → He offered ___ my bag.",
        hint: "carry",
        answers: ["to carry"],
        explain: "offer + to V: đề nghị (tự mình) làm gì cho ai.",
      },
      {
        kind: "fill",
        question: "\"Yes, I lied to you.\" → She admitted ___ to me.",
        hint: "lie",
        answers: ["lying", "having lied", "to lying", "to having lied"],
        explain: "admit + V-ing (hoặc having + V3). Lưu ý: lie (nói dối) → lying.",
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // 6. Wish / If only
  // ---------------------------------------------------------------------------
  {
    id: "b2-wish",
    level: "B2",
    title: "Câu ước với wish và if only",
    titleEn: "Wish and if only",
    summary:
      "Dùng wish / if only để ước điều trái với thực tế ở hiện tại và quá khứ, phàn nàn về hành vi của người khác (wish + would), và nói về khả năng (wish + could). Phân biệt wish với hope.",
    sections: [
      {
        heading: "Wish và if only dùng để làm gì?",
        text:
          "wish và if only diễn tả mong muốn một điều KHÁC với thực tế. Vì điều ước không có thật, động từ sau wish được “lùi về quá khứ” một bậc — giống câu điều kiện loại 2 và loại 3.",
        points: [
          "if only có nghĩa như wish nhưng mạnh hơn, giàu cảm xúc hơn (“giá mà...”).",
          "Muốn ước điều có thể xảy ra trong tương lai thì dùng hope, không dùng wish.",
        ],
      },
      {
        heading: "Ước ở hiện tại",
        formulas: [
          { label: "Hiện tại", pattern: "S + wish + S + V2 / were" },
          { label: "Khả năng ở hiện tại", pattern: "S + wish + S + could + V" },
          { label: "If only", pattern: "If only + S + V2 / were" },
        ],
        points: [
          "Với be, dùng were cho mọi ngôi (trang trọng, chuẩn trong bài thi); was cũng phổ biến trong văn nói: I wish I was taller.",
          "Dùng could khi ước mình có khả năng làm gì: I wish I could swim.",
        ],
        examples: [
          { en: "I wish I had more free time.", vi: "Ước gì tôi có nhiều thời gian rảnh hơn.", note: "Thực tế: tôi không có nhiều thời gian rảnh." },
          { en: "I wish I were taller.", vi: "Ước gì tôi cao hơn." },
          { en: "If only I knew her phone number!", vi: "Giá mà tôi biết số điện thoại của cô ấy!" },
          { en: "I wish I could speak Japanese.", vi: "Ước gì tôi nói được tiếng Nhật." },
          { en: "I wish I didn't live so far from work.", vi: "Ước gì tôi không sống xa chỗ làm như vậy." },
        ],
      },
      {
        heading: "Ước ở quá khứ (tiếc nuối)",
        formulas: [
          { label: "Quá khứ", pattern: "S + wish + S + had + V3" },
          { label: "Phủ định", pattern: "S + wish + S + hadn't + V3" },
          { label: "Khả năng ở quá khứ", pattern: "S + wish + S + could have + V3" },
        ],
        examples: [
          { en: "I wish I hadn't eaten so much.", vi: "Ước gì tôi đã không ăn nhiều như thế.", note: "Thực tế: tôi đã ăn quá nhiều." },
          { en: "If only we had left earlier!", vi: "Giá mà chúng ta đi sớm hơn!" },
          { en: "She wishes she had studied medicine.", vi: "Cô ấy ước mình đã học ngành y." },
          { en: "I wish I could have come to your wedding.", vi: "Ước gì tôi đã có thể đến dự đám cưới của bạn." },
        ],
      },
      {
        heading: "wish + would: phàn nàn, mong ai/cái gì thay đổi",
        formulas: [{ label: "Phàn nàn", pattern: "S + wish + sb/sth + would (not) + V" }],
        points: [
          "Dùng để thể hiện sự khó chịu với hành vi của người khác, hoặc mong một điều gì thay đổi: I wish it would stop raining.",
          "Không dùng ✗ I wish I would... (với chính mình, dùng could hoặc V2).",
          "Không dùng would cho trạng thái không tự thay đổi được: ✓ I wish he were taller (✗ would be taller).",
        ],
        examples: [
          { en: "I wish you would stop interrupting me.", vi: "Ước gì bạn thôi ngắt lời tôi đi.", note: "Phàn nàn, khó chịu." },
          { en: "I wish it would stop raining.", vi: "Ước gì trời tạnh mưa." },
          { en: "I wish my neighbours wouldn't play loud music at night.", vi: "Ước gì hàng xóm đừng mở nhạc to vào ban đêm." },
        ],
      },
      {
        heading: "Bảng tổng hợp và phân biệt wish / hope",
        table: {
          head: ["Ý nghĩa", "Cấu trúc", "Ví dụ"],
          rows: [
            ["Ước trái hiện tại", "wish + V2 / were", "I wish I had a car."],
            ["Ước có khả năng", "wish + could + V", "I wish I could drive."],
            ["Tiếc nuối quá khứ", "wish + had + V3", "I wish I had listened."],
            ["Phàn nàn / mong thay đổi", "wish + sb + would + V", "I wish you would listen."],
            ["Hy vọng (có thể xảy ra)", "hope + hiện tại / will", "I hope you pass the exam."],
            ["Chúc", "wish + sb + sth", "I wish you a happy birthday."],
          ],
        },
      },
    ],
    mistakes: [
      {
        wrong: "I wish I have a car.",
        right: "I wish I had a car.",
        why: "Ước trái với hiện tại phải lùi thì: dùng V2 (had), không dùng hiện tại đơn.",
      },
      {
        wrong: "I wish I didn't say that yesterday.",
        right: "I wish I hadn't said that yesterday.",
        why: "Tiếc nuối về quá khứ (yesterday) dùng had + V3.",
      },
      {
        wrong: "I wish I would be rich.",
        right: "I wish I were rich.",
        why: "Không dùng “I wish I would”. Trạng thái ở hiện tại dùng V2/were.",
      },
      {
        wrong: "I wish you pass the exam tomorrow.",
        right: "I hope you pass the exam tomorrow.",
        why: "Mong điều có thể xảy ra trong tương lai dùng hope, không dùng wish.",
      },
      {
        wrong: "I wish I can play the guitar.",
        right: "I wish I could play the guitar.",
        why: "Sau wish, can lùi thành could.",
      },
    ],
    exercises: [
      {
        kind: "choice",
        question: "I don't have a car. I wish I ___ one.",
        options: ["have", "had", "would have", "had had"],
        answer: 1,
        explain: "Ước trái với hiện tại → wish + V2: had. “had had” dùng cho quá khứ.",
      },
      {
        kind: "choice",
        question: "I failed the test. If only I ___ harder!",
        options: ["studied", "would study", "had studied", "have studied"],
        answer: 2,
        explain: "Tiếc nuối về việc đã xảy ra (đã trượt) → if only + had + V3.",
      },
      {
        kind: "choice",
        question: "My neighbour plays loud music every night. I wish he ___ it down.",
        options: ["will turn", "turns", "had turned", "would turn"],
        answer: 3,
        explain: "Phàn nàn, mong người khác thay đổi hành vi → wish + sb + would + V.",
      },
      {
        kind: "choice",
        question: "I can't swim. I wish I ___ swim.",
        options: ["could", "can", "would", "will"],
        answer: 0,
        explain: "Ước có khả năng ở hiện tại → wish + could + V. Không dùng “I wish I would”.",
      },
      {
        kind: "choice",
        question: "You're going to Da Lat tomorrow? I ___ you have a great time!",
        options: ["wish", "hope", "would", "if only"],
        answer: 1,
        explain: "Mong điều có thể xảy ra trong tương lai → hope + hiện tại đơn. “I wish you have...” là sai.",
      },
      {
        kind: "fill",
        question: "I'm so tired today. I wish I ___ to bed so late last night.",
        hint: "not / go",
        answers: ["hadn't gone", "had not gone"],
        explain: "Tiếc nuối về quá khứ (last night) → wish + had + V3; phủ định: hadn't gone.",
      },
      {
        kind: "fill",
        question: "It's freezing in here. I wish it ___ a bit warmer.",
        hint: "be",
        answers: ["were", "was"],
        explain: "Ước trái với hiện tại, động từ be → were (chuẩn) hoặc was (văn nói).",
      },
      {
        kind: "fill",
        question: "I was ill last weekend. I wish I ___ to your party.",
        hint: "can / come",
        answers: ["could have come", "had been able to come"],
        explain: "Ước về khả năng trong quá khứ → wish + could have + V3 (could have come).",
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // 7. Future continuous / future perfect
  // ---------------------------------------------------------------------------
  {
    id: "b2-future-advanced",
    level: "B2",
    title: "Tương lai tiếp diễn và tương lai hoàn thành",
    titleEn: "Future continuous and future perfect",
    summary:
      "Dùng will be V-ing để nói việc đang diễn ra tại một thời điểm trong tương lai, will have V3 để nói việc sẽ hoàn thành trước một mốc tương lai (by...), và làm quen với tương lai hoàn thành tiếp diễn.",
    sections: [
      {
        heading: "Hình dung trên trục thời gian",
        text:
          "Hãy tưởng tượng bạn đứng ở một thời điểm trong tương lai (ví dụ 8 giờ tối mai) và nhìn quanh:",
        points: [
          "Việc gì đang diễn ra dở dang ngay lúc đó → tương lai tiếp diễn: will be + V-ing.",
          "Việc gì đã xong trước lúc đó → tương lai hoàn thành: will have + V3.",
          "Việc gì đã kéo dài được bao lâu tính đến lúc đó → tương lai hoàn thành tiếp diễn: will have been + V-ing.",
        ],
      },
      {
        heading: "Tương lai tiếp diễn (will be + V-ing)",
        formulas: [
          { label: "Khẳng định", pattern: "S + will be + V-ing" },
          { label: "Phủ định", pattern: "S + won't be + V-ing" },
          { label: "Nghi vấn", pattern: "Will + S + be + V-ing?" },
        ],
        points: [
          "Hành động đang diễn ra tại một thời điểm cụ thể trong tương lai: this time tomorrow, at 8 p.m. tonight...",
          "Việc sẽ xảy ra như một phần của lịch trình/lẽ thường (không phải quyết định tức thời): I'll be seeing Lan tomorrow.",
          "Hỏi lịch sự về kế hoạch của người khác (thường để nhờ vả): Will you be using the car tonight?",
        ],
        examples: [
          { en: "This time tomorrow, I'll be lying on the beach.", vi: "Giờ này ngày mai tôi đang nằm trên bãi biển rồi." },
          { en: "Don't call me at 8 — I'll be having dinner.", vi: "Đừng gọi tôi lúc 8 giờ nhé — lúc đó tôi đang ăn tối." },
          { en: "Will you be using the car this evening? I'd like to borrow it.", vi: "Tối nay bạn có dùng xe không? Tôi muốn mượn một chút." },
          { en: "I'll be seeing Lan tomorrow, so I can give her the message.", vi: "Mai tôi sẽ gặp Lan, nên tôi có thể chuyển lời cho cô ấy." },
        ],
      },
      {
        heading: "Tương lai hoàn thành (will have + V3)",
        formulas: [
          { label: "Khẳng định", pattern: "S + will have + V3" },
          { label: "Phủ định", pattern: "S + won't have + V3" },
          { label: "Đi kèm", pattern: "by + mốc thời gian / by the time + S + V (hiện tại đơn)" },
        ],
        points: [
          "Diễn tả việc sẽ hoàn thành TRƯỚC một mốc thời gian trong tương lai.",
          "by = không muộn hơn, trước hoặc đúng lúc (by Friday, by 2030, by then). Khác until = kéo dài đến tận lúc đó.",
          "Sau by the time / before / when không dùng will: ✓ by the time you arrive (✗ will arrive).",
        ],
        examples: [
          { en: "By the end of this year, I will have saved enough money to buy a motorbike.", vi: "Đến cuối năm nay, tôi sẽ để dành đủ tiền mua xe máy." },
          { en: "The film will have started by the time we get there.", vi: "Khi chúng ta đến nơi thì phim đã bắt đầu rồi." },
          { en: "I won't have finished the report by Friday.", vi: "Đến thứ Sáu tôi vẫn chưa làm xong báo cáo được." },
          { en: "By the time you wake up, I'll have left for the airport.", vi: "Lúc bạn thức dậy thì tôi đã đi ra sân bay rồi." },
          { en: "By next June, they will have been married for 25 years.", vi: "Đến tháng Sáu năm sau, họ đã cưới nhau được 25 năm.", note: "be married là trạng thái nên dùng will have been married, không dùng dạng tiếp diễn." },
        ],
      },
      {
        heading: "Sơ lược: tương lai hoàn thành tiếp diễn",
        formulas: [{ label: "Khẳng định", pattern: "S + will have been + V-ing + for + khoảng thời gian" }],
        points: [
          "Nhấn mạnh một hành động đã kéo dài bao lâu tính đến một mốc trong tương lai (thường đi với for).",
          "Không dùng với động từ chỉ trạng thái (know, be, have = sở hữu...): ✓ By next year I'll have known her for 10 years.",
        ],
        examples: [
          { en: "Next month, I will have been working here for ten years.", vi: "Đến tháng sau là tôi đã làm việc ở đây được mười năm." },
          { en: "By 6 p.m., she will have been driving for eight hours.", vi: "Đến 6 giờ tối là cô ấy đã lái xe liền tám tiếng rồi." },
        ],
      },
      {
        heading: "Bảng so sánh",
        table: {
          head: ["Thì", "Công thức", "Ý nghĩa", "Ví dụ"],
          rows: [
            ["Tương lai đơn", "will + V", "Quyết định, dự đoán, lời hứa", "I'll call you later."],
            ["Tương lai tiếp diễn", "will be + V-ing", "Đang diễn ra tại một thời điểm tương lai", "At 9 tonight I'll be studying."],
            ["Tương lai hoàn thành", "will have + V3", "Hoàn thành trước một mốc tương lai", "By 9 I'll have finished."],
            ["TLHT tiếp diễn", "will have been + V-ing", "Kéo dài bao lâu tính đến mốc tương lai", "By 9 I'll have been studying for 3 hours."],
          ],
        },
      },
    ],
    mistakes: [
      {
        wrong: "By the time you will arrive, we will have eaten.",
        right: "By the time you arrive, we will have eaten.",
        why: "Sau by the time (mệnh đề thời gian) dùng hiện tại đơn, không dùng will.",
      },
      {
        wrong: "By next week I will finish the project.",
        right: "By next week I will have finished the project.",
        why: "“By + mốc tương lai” nhấn mạnh sự hoàn thành trước mốc đó → dùng will have + V3.",
      },
      {
        wrong: "Don't call me at 9 — I will watch the match.",
        right: "Don't call me at 9 — I will be watching the match.",
        why: "Lúc 9 giờ trận đấu đang diễn ra → dùng tương lai tiếp diễn.",
      },
      {
        wrong: "I will have finished the essay until Friday.",
        right: "I will have finished the essay by Friday.",
        why: "by = không muộn hơn (hạn chót); until = kéo dài đến lúc đó. Tương lai hoàn thành đi với by.",
      },
      {
        wrong: "By next year I will have been knowing her for ten years.",
        right: "By next year I will have known her for ten years.",
        why: "know là động từ trạng thái, không dùng ở dạng tiếp diễn.",
      },
    ],
    exercises: [
      {
        kind: "choice",
        question: "Don't phone me between 7 and 8 — I ___ my favourite show.",
        options: ["will watch", "will be watching", "will have watched", "watch"],
        answer: 1,
        explain: "Hành động đang diễn ra trong khoảng 7–8 giờ ở tương lai → tương lai tiếp diễn.",
      },
      {
        kind: "choice",
        question: "By the time you get home, I ___ dinner, so we can eat straight away.",
        options: ["will cook", "am cooking", "will have cooked", "cook"],
        answer: 2,
        explain: "Bữa tối sẽ nấu xong trước khi bạn về (“ăn ngay được”) → tương lai hoàn thành will have + V3.",
      },
      {
        kind: "choice",
        question: "The train ___ by the time we reach the station.",
        options: ["will leave", "has left", "will have left", "leaves"],
        answer: 2,
        explain: "Tàu sẽ rời đi trước khi chúng ta đến ga → will have left. “has left” là hiện tại hoàn thành, không dùng cho mốc tương lai.",
      },
      {
        kind: "choice",
        question: "Next month, Mr Long ___ at this school for twenty years.",
        options: ["will teach", "has been teaching", "teaches", "will have been teaching"],
        answer: 3,
        explain: "Nhấn mạnh khoảng thời gian (for twenty years) tính đến một mốc tương lai (next month) → tương lai hoàn thành tiếp diễn.",
      },
      {
        kind: "choice",
        question: "Please send me the report ___ Friday at the latest.",
        options: ["by", "until", "since", "in"],
        answer: 0,
        explain: "by + thời điểm = không muộn hơn (hạn chót). until dùng cho hành động kéo dài đến lúc đó.",
      },
      {
        kind: "fill",
        question: "This time next week, we ___ on a beach in Phu Quoc.",
        hint: "lie",
        answers: ["will be lying", "'ll be lying"],
        explain: "Hành động đang diễn ra tại một thời điểm tương lai (this time next week) → will be + V-ing. lie → lying.",
      },
      {
        kind: "fill",
        question: "Hurry up! By the time we get there, the concert ___.",
        hint: "start",
        answers: ["will have started", "'ll have started", "will already have started"],
        explain: "Buổi hòa nhạc bắt đầu trước khi chúng ta đến → will have + V3.",
      },
      {
        kind: "fill",
        question: "I'm afraid I ___ the report by Friday. Can I have more time?",
        hint: "not / finish",
        answers: ["won't have finished", "will not have finished"],
        explain: "Đến hạn thứ Sáu việc vẫn chưa xong → phủ định tương lai hoàn thành: won't have + V3.",
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // 8. Modal perfect
  // ---------------------------------------------------------------------------
  {
    id: "b2-modal-perfect",
    level: "B2",
    title: "Động từ khuyết thiếu hoàn thành (modal + have + V3)",
    titleEn: "Modal perfect: should have, must have, might have...",
    summary:
      "Dùng modal + have + V3 để nói về quá khứ: tiếc nuối hoặc trách (should have), suy luận chắc chắn (must have / can't have), khả năng (might / may / could have) và phân biệt needn't have với didn't need to.",
    sections: [
      {
        heading: "Modal perfect là gì?",
        text:
          "Khi đặt have + V3 sau một động từ khuyết thiếu, ta chuyển ý nghĩa của nó về QUÁ KHỨ: nhận xét, phỏng đoán hay tiếc nuối về một việc đã (hoặc chưa) xảy ra.",
        formulas: [
          { label: "Khẳng định", pattern: "S + modal + have + V3" },
          { label: "Phủ định", pattern: "S + modal + not + have + V3" },
        ],
        points: [
          "Sau modal luôn là have (không bao giờ là has hay had): She must have left.",
          "Trong văn nói, have thường đọc nhẹ /əv/ — nên đừng viết nhầm thành “should of”.",
        ],
      },
      {
        heading: "should have / shouldn't have: tiếc nuối, trách móc",
        formulas: [
          { label: "Lẽ ra nên (nhưng đã không)", pattern: "S + should have + V3" },
          { label: "Lẽ ra không nên (nhưng đã làm)", pattern: "S + shouldn't have + V3" },
        ],
        points: [
          "ought to have + V3 có nghĩa tương tự should have nhưng ít dùng hơn.",
          "should have còn dùng cho việc lẽ ra đã phải xảy ra theo dự tính: They should have arrived by now. (Đáng lẽ giờ này họ đến rồi.)",
        ],
        examples: [
          { en: "I should have listened to your advice.", vi: "Lẽ ra tôi nên nghe lời khuyên của bạn." },
          { en: "You shouldn't have shouted at her.", vi: "Lẽ ra bạn không nên quát cô ấy." },
          { en: "The bus should have come ten minutes ago.", vi: "Đáng lẽ xe buýt phải đến từ mười phút trước rồi." },
        ],
      },
      {
        heading: "must have / can't have / couldn't have: suy luận về quá khứ",
        formulas: [
          { label: "Chắc chắn đã", pattern: "S + must have + V3" },
          { label: "Chắc chắn không thể đã", pattern: "S + can't / couldn't have + V3" },
        ],
        points: [
          "Dựa vào bằng chứng để kết luận gần như chắc chắn.",
          "Phủ định của must have (suy luận) là can't have / couldn't have — KHÔNG dùng mustn't have.",
        ],
        examples: [
          { en: "The ground is wet. It must have rained last night.", vi: "Mặt đất ướt. Chắc hẳn tối qua trời đã mưa." },
          { en: "She can't have forgotten — I reminded her this morning.", vi: "Cô ấy không thể nào quên được — sáng nay tôi đã nhắc cô ấy rồi." },
          { en: "He couldn't have seen me; it was too dark.", vi: "Anh ấy không thể nào đã nhìn thấy tôi; lúc đó trời quá tối." },
        ],
      },
      {
        heading: "might / may / could have: khả năng trong quá khứ",
        formulas: [
          { label: "Có lẽ đã", pattern: "S + might / may / could have + V3" },
          { label: "Có lẽ đã không", pattern: "S + might not / may not have + V3" },
          { label: "Đã có thể (nhưng không xảy ra)", pattern: "S + could have + V3" },
        ],
        points: [
          "might not have (có lẽ đã không) khác couldn't have (chắc chắn đã không).",
          "could have còn diễn tả điều đã có thể xảy ra nhưng thực tế không xảy ra, hoặc để trách nhẹ: You could have told me!",
        ],
        examples: [
          { en: "He's late. He might have missed the bus.", vi: "Anh ấy đến muộn. Có lẽ anh ấy đã lỡ xe buýt." },
          { en: "They may not have received my email.", vi: "Có lẽ họ chưa nhận được email của tôi." },
          { en: "You could have hurt yourself!", vi: "Suýt nữa thì bạn đã tự làm mình bị thương rồi!" },
          { en: "You could have told me you were coming!", vi: "Lẽ ra bạn đã có thể báo cho tôi biết là bạn đến chứ!" },
        ],
      },
      {
        heading: "needn't have V3 và didn't need to V",
        points: [
          "needn't have + V3: đã LÀM việc đó, nhưng hóa ra không cần thiết (thường gây lãng phí).",
          "didn't need to + V: không cần làm việc đó — thường ngụ ý là đã không làm (nhưng cũng có thể dùng khi đã làm; ngữ cảnh sẽ cho biết).",
        ],
        examples: [
          { en: "I needn't have bought so much food — nobody was hungry.", vi: "Lẽ ra tôi không cần mua nhiều đồ ăn như vậy — chẳng ai đói cả.", note: "Đã mua, nhưng không cần." },
          { en: "I didn't need to get up early, so I stayed in bed.", vi: "Tôi không cần dậy sớm nên tôi nằm lì trên giường.", note: "Không cần và đã không làm." },
        ],
      },
      {
        heading: "Bảng tổng hợp",
        table: {
          head: ["Cấu trúc", "Ý nghĩa", "Ví dụ"],
          rows: [
            ["should have V3", "Lẽ ra nên (nhưng không làm)", "I should have called her."],
            ["shouldn't have V3", "Lẽ ra không nên (nhưng đã làm)", "You shouldn't have lied."],
            ["must have V3", "Chắc chắn đã", "He must have left early."],
            ["can't / couldn't have V3", "Chắc chắn không thể đã", "She can't have seen it."],
            ["might / may / could have V3", "Có lẽ đã", "They might have got lost."],
            ["could have V3", "Đã có thể (nhưng không)", "We could have won."],
            ["needn't have V3", "Đã làm nhưng không cần", "I needn't have hurried."],
            ["didn't need to V", "Không cần làm (thường là không làm)", "I didn't need to hurry."],
          ],
        },
      },
    ],
    mistakes: [
      {
        wrong: "I should studied harder.",
        right: "I should have studied harder.",
        why: "Nói về quá khứ phải có have: should + have + V3.",
      },
      {
        wrong: "He mustn't have seen me.",
        right: "He can't have seen me.",
        why: "Suy luận phủ định về quá khứ dùng can't/couldn't have, không dùng mustn't have.",
      },
      {
        wrong: "She must has gone home.",
        right: "She must have gone home.",
        why: "Sau modal luôn là động từ nguyên mẫu: have (không phải has/had).",
      },
      {
        wrong: "You should have went to the doctor.",
        right: "You should have gone to the doctor.",
        why: "Sau have phải là V3 (gone), không phải V2 (went).",
      },
      {
        wrong: "You needn't to have brought a gift.",
        right: "You needn't have brought a gift.",
        why: "needn't là modal, theo sau trực tiếp là have + V3, không có to.",
      },
    ],
    exercises: [
      {
        kind: "choice",
        question: "Nam isn't answering his phone. He ___ it at home.",
        options: ["might have left", "should have left", "needn't have left", "must leave"],
        answer: 0,
        explain: "Đoán về khả năng trong quá khứ → might have + V3. “should have left” có nghĩa “lẽ ra nên để ở nhà” — không hợp ngữ cảnh.",
      },
      {
        kind: "choice",
        question: "I failed my driving test. I ___ more lessons.",
        options: ["should take", "should have taken", "must have taken", "needn't have taken"],
        answer: 1,
        explain: "Tiếc nuối việc lẽ ra nên làm nhưng đã không làm → should have + V3.",
      },
      {
        kind: "choice",
        question: "She ___ the email — she was on holiday with no internet.",
        options: ["must have read", "should have read", "can't have read", "needn't have read"],
        answer: 2,
        explain: "Có bằng chứng (không có internet) → chắc chắn không thể đã đọc: can't have + V3.",
      },
      {
        kind: "choice",
        question: "The streets are all wet. It ___ during the night.",
        options: ["can't have rained", "should have rained", "needn't have rained", "must have rained"],
        answer: 3,
        explain: "Dựa vào bằng chứng (đường ướt) để kết luận chắc chắn → must have + V3.",
      },
      {
        kind: "choice",
        question: "My friend offered to drive me to the airport, so I ___ a taxi. I saved a lot of money.",
        options: ["needn't have taken", "didn't need to take", "shouldn't have taken", "mustn't have taken"],
        answer: 1,
        explain:
          "Người nói không đi taxi (đã tiết kiệm tiền) → didn't need to + V. “needn't have taken” nghĩa là đã đi taxi nhưng không cần — mâu thuẫn với “saved a lot of money”.",
      },
      {
        kind: "fill",
        question: "I ___ so much food. Half of it went in the bin.",
        hint: "needn't / buy",
        answers: ["needn't have bought", "need not have bought"],
        explain: "Đã mua nhưng hóa ra không cần (phải vứt đi) → needn't have + V3 (bought).",
      },
      {
        kind: "fill",
        question: "Why didn't you ask for help? You ___ me! I would have helped you.",
        hint: "can / tell",
        answers: ["could have told"],
        explain: "Trách nhẹ về điều đã có thể làm nhưng không làm → could have + V3 (told).",
      },
      {
        kind: "fill",
        question: "He ___ the money — he was with me all evening.",
        hint: "can't / steal",
        answers: ["can't have stolen", "cannot have stolen", "couldn't have stolen", "could not have stolen"],
        explain: "Có bằng chứng chắc chắn anh ấy không làm → can't have + V3 (steal – stole – stolen).",
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // 9. Gerund vs infinitive with change of meaning
  // ---------------------------------------------------------------------------
  {
    id: "b2-gerund-infinitive",
    level: "B2",
    title: "V-ing và to V làm thay đổi nghĩa",
    titleEn: "Verbs + -ing or to-infinitive with a change in meaning",
    summary:
      "Một số động từ có thể đi với cả V-ing và to V nhưng nghĩa khác nhau: remember, forget, stop, try, regret, mean, go on, need. Bài này giúp bạn phân biệt chính xác từng cặp.",
    sections: [
      {
        heading: "Quy tắc chung để dễ nhớ",
        text:
          "Không có quy tắc tuyệt đối, nhưng có một mẹo hữu ích: to V thường hướng tới một việc SAU đó (mục đích, việc cần làm), còn V-ing thường nói về một việc đã/đang xảy ra.",
        points: [
          "remember to do: nhớ (trước) → rồi làm. remember doing: đã làm → (bây giờ) nhớ lại.",
          "Với like, love, hate, prefer, begin, start, continue: dùng V-ing hay to V nghĩa gần như không đổi.",
        ],
      },
      {
        heading: "remember / forget",
        formulas: [
          { label: "Nhớ phải làm", pattern: "remember + to V" },
          { label: "Nhớ là đã làm", pattern: "remember + V-ing" },
          { label: "Quên làm", pattern: "forget + to V" },
          { label: "Quên là đã làm", pattern: "forget + V-ing (thường: I'll never forget V-ing)" },
        ],
        examples: [
          { en: "Remember to lock the door when you go out.", vi: "Nhớ khóa cửa khi bạn ra ngoài nhé." },
          { en: "I remember locking the door, but now it's open!", vi: "Tôi nhớ là đã khóa cửa rồi, vậy mà giờ nó lại mở!" },
          { en: "I forgot to call my mum yesterday.", vi: "Hôm qua tôi quên gọi cho mẹ." },
          { en: "I'll never forget seeing the sea for the first time.", vi: "Tôi sẽ không bao giờ quên lần đầu tiên nhìn thấy biển." },
        ],
      },
      {
        heading: "stop / try",
        formulas: [
          { label: "Ngừng làm", pattern: "stop + V-ing" },
          { label: "Dừng lại để làm việc khác", pattern: "stop + to V" },
          { label: "Cố gắng làm (khó)", pattern: "try + to V" },
          { label: "Thử làm xem có hiệu quả không", pattern: "try + V-ing" },
        ],
        examples: [
          { en: "He stopped smoking two years ago.", vi: "Anh ấy đã bỏ thuốc lá hai năm trước." },
          { en: "We stopped to buy some water.", vi: "Chúng tôi dừng lại để mua nước." },
          { en: "I tried to keep my eyes open, but I fell asleep.", vi: "Tôi cố giữ cho mắt mở nhưng vẫn ngủ gật." },
          { en: "The soup is bland. Try adding some salt.", vi: "Món súp nhạt quá. Thử cho thêm chút muối xem." },
        ],
      },
      {
        heading: "regret / mean / go on",
        formulas: [
          { label: "Hối tiếc đã làm", pattern: "regret + V-ing" },
          { label: "Lấy làm tiếc phải báo (trang trọng)", pattern: "regret + to inform / tell / say" },
          { label: "Có nghĩa là, kéo theo", pattern: "mean + V-ing" },
          { label: "Định, có ý", pattern: "mean + to V" },
          { label: "Tiếp tục cùng việc đó", pattern: "go on + V-ing" },
          { label: "Chuyển sang làm việc tiếp theo", pattern: "go on + to V" },
        ],
        examples: [
          { en: "I regret telling her my secret.", vi: "Tôi hối hận vì đã kể bí mật cho cô ấy." },
          { en: "We regret to inform you that your flight has been cancelled.", vi: "Chúng tôi rất tiếc phải thông báo rằng chuyến bay của quý khách đã bị hủy." },
          { en: "A new job often means moving to a new city.", vi: "Công việc mới thường đồng nghĩa với việc chuyển đến thành phố mới." },
          { en: "Sorry, I didn't mean to hurt you.", vi: "Xin lỗi, tôi không cố ý làm bạn tổn thương." },
          { en: "She went on talking even though nobody was listening.", vi: "Cô ấy cứ tiếp tục nói dù chẳng ai nghe." },
          { en: "After university, he went on to become a famous lawyer.", vi: "Sau đại học, anh ấy tiếp tục trở thành một luật sư nổi tiếng." },
        ],
      },
      {
        heading: "need + to V và need + V-ing",
        formulas: [
          { label: "Chủ động: ai đó cần làm", pattern: "S (người) + need + to V" },
          { label: "Bị động: cái gì cần được làm", pattern: "S (vật) + need + V-ing = need + to be + V3" },
        ],
        points: [
          "need + V-ing mang nghĩa bị động và phổ biến trong tiếng Anh-Anh; need to be + V3 dùng được ở mọi nơi.",
        ],
        examples: [
          { en: "I need to wash my car.", vi: "Tôi cần rửa xe." },
          { en: "My car needs washing. / My car needs to be washed.", vi: "Xe của tôi cần được rửa." },
        ],
      },
      {
        heading: "Bảng so sánh",
        table: {
          head: ["Động từ", "+ to V", "+ V-ing"],
          rows: [
            ["remember", "nhớ phải làm (việc sắp làm)", "nhớ là đã làm"],
            ["forget", "quên làm", "quên là đã làm"],
            ["stop", "dừng lại để làm việc khác", "ngừng làm việc đang làm"],
            ["try", "cố gắng làm", "thử làm xem sao"],
            ["regret", "lấy làm tiếc phải (thông báo)", "hối hận vì đã làm"],
            ["mean", "định, có ý làm", "có nghĩa là, kéo theo"],
            ["go on", "chuyển sang làm việc khác", "tiếp tục làm việc đang làm"],
            ["need", "(người) cần làm", "(vật) cần được làm"],
          ],
        },
      },
    ],
    mistakes: [
      {
        wrong: "I remember to lock the door last night.",
        right: "I remember locking the door last night.",
        why: "Nhớ lại việc đã làm trong quá khứ → remember + V-ing.",
      },
      {
        wrong: "Don't forget turning off the lights.",
        right: "Don't forget to turn off the lights.",
        why: "Quên/nhớ một việc cần làm (chưa làm) → forget + to V.",
      },
      {
        wrong: "My doctor told me to stop to smoke.",
        right: "My doctor told me to stop smoking.",
        why: "Ngừng (bỏ) một thói quen → stop + V-ing. stop to V nghĩa là dừng lại để làm gì.",
      },
      {
        wrong: "My shirt needs to iron.",
        right: "My shirt needs ironing. / My shirt needs to be ironed.",
        why: "Cái áo không tự ủi → nghĩa bị động: need + V-ing hoặc need to be + V3.",
      },
      {
        wrong: "I regret to tell her the truth yesterday.",
        right: "I regret telling her the truth yesterday.",
        why: "Hối hận về việc đã làm → regret + V-ing. regret to tell dùng khi thông báo tin buồn.",
      },
    ],
    exercises: [
      {
        kind: "choice",
        question: "Did you remember ___ the windows before we left?",
        options: ["closing", "to close", "close", "closed"],
        answer: 1,
        explain: "Hỏi xem bạn có nhớ làm việc cần làm (đóng cửa sổ trước khi đi) không → remember + to V.",
      },
      {
        kind: "choice",
        question: "I'll never forget ___ the sea for the first time.",
        options: ["seeing", "to see", "see", "to have seen"],
        answer: 0,
        explain: "Không quên một kỷ niệm đã trải qua → forget + V-ing (I'll never forget V-ing).",
      },
      {
        kind: "choice",
        question: "We were tired after walking for hours, so we stopped ___ a rest.",
        options: ["having", "have", "to have", "had"],
        answer: 2,
        explain: "Dừng lại để nghỉ ngơi (mục đích) → stop + to V. “stopped having a rest” nghĩa là thôi nghỉ — ngược ý.",
      },
      {
        kind: "choice",
        question: "The soup isn't very tasty. Why don't you try ___ some pepper?",
        options: ["adding", "to add", "add", "added"],
        answer: 0,
        explain: "Gợi ý thử một cách xem có hiệu quả không → try + V-ing. try to V nghĩa là cố gắng làm việc khó.",
      },
      {
        kind: "choice",
        question: "We regret ___ you that the concert has been cancelled.",
        options: ["informing", "inform", "to inform", "informed"],
        answer: 2,
        explain: "Lấy làm tiếc phải thông báo tin xấu (trang trọng) → regret + to inform. “regret informing” là hối hận vì đã thông báo.",
      },
      {
        kind: "fill",
        question: "My bike needs ___ — both tyres are flat.",
        hint: "repair",
        answers: ["repairing", "to be repaired"],
        explain: "Chiếc xe cần được sửa (nghĩa bị động) → need + V-ing hoặc need to be + V3.",
      },
      {
        kind: "fill",
        question: "The professor introduced the topic and then went on ___ some examples.",
        hint: "give",
        answers: ["to give"],
        explain: "Xong việc giới thiệu rồi chuyển sang việc tiếp theo (đưa ví dụ) → go on + to V.",
      },
      {
        kind: "fill",
        question: "Sorry, I didn't mean ___ you. It was an accident.",
        hint: "upset",
        answers: ["to upset"],
        explain: "mean + to V = định, cố ý làm gì. “Tôi không cố ý làm bạn buồn.”",
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // 10. Linkers: contrast and purpose
  // ---------------------------------------------------------------------------
  {
    id: "b2-linkers",
    level: "B2",
    title: "Từ nối chỉ sự tương phản và mục đích",
    titleEn: "Linkers of contrast and purpose",
    summary:
      "Dùng đúng các từ nối tương phản (although, even though, despite, in spite of, however, whereas, while, nevertheless) và chỉ mục đích (so that, in order to, so as to). Điểm mấu chốt là biết sau mỗi từ là mệnh đề hay danh từ/V-ing.",
    sections: [
      {
        heading: "Điều quan trọng nhất: theo sau là gì?",
        text:
          "Các từ nối có nghĩa giống nhau nhưng cấu trúc theo sau lại khác nhau. Trước khi dùng, hãy tự hỏi: sau từ này là một mệnh đề (S + V), một danh từ/V-ing, hay nó đứng đầu một câu mới?",
        table: {
          head: ["Theo sau là", "Từ nối"],
          rows: [
            ["Mệnh đề (S + V)", "although, even though, though, whereas, while, so that"],
            ["Danh từ / V-ing", "despite, in spite of"],
            ["Đầu câu mới / sau dấu chấm phẩy, có dấu phẩy", "However, Nevertheless,"],
            ["Động từ nguyên mẫu", "to, in order to, so as to (+ not)"],
          ],
        },
      },
      {
        heading: "Tương phản + mệnh đề: although, even though, though, whereas, while",
        formulas: [
          { label: "Although / Even though", pattern: "Although / Even though + S + V, S + V" },
          { label: "Though cuối câu (văn nói)", pattern: "S + V. S + V, though." },
          { label: "Whereas / While", pattern: "S + V, whereas / while + S + V" },
        ],
        points: [
          "even though nhấn mạnh hơn although. though thân mật hơn và còn đứng được ở cuối câu.",
          "Không dùng although và but trong cùng một câu: ✗ Although he was tired, but he...",
          "whereas / while dùng để so sánh đối lập hai sự việc, hai người.",
        ],
        examples: [
          { en: "Although it was raining, we went for a walk.", vi: "Mặc dù trời mưa, chúng tôi vẫn đi dạo." },
          { en: "Even though he's very rich, he lives in a small flat.", vi: "Mặc dù rất giàu, anh ấy vẫn sống trong một căn hộ nhỏ." },
          { en: "The film was very long. I enjoyed it, though.", vi: "Bộ phim rất dài. Dù vậy tôi vẫn thích nó." },
          { en: "My brother is tall, whereas I'm quite short.", vi: "Anh trai tôi cao, trong khi tôi lại khá thấp." },
          { en: "While some people love spicy food, others can't stand it.", vi: "Trong khi một số người rất thích đồ cay, những người khác lại không chịu được." },
        ],
      },
      {
        heading: "Tương phản + danh từ / V-ing: despite, in spite of",
        formulas: [
          { label: "Despite / In spite of", pattern: "Despite / In spite of + N / V-ing, S + V" },
          { label: "Với mệnh đề", pattern: "Despite / In spite of + the fact that + S + V" },
        ],
        points: [
          "Không có “despite of”: ✓ despite = ✓ in spite of.",
          "Muốn đặt mệnh đề sau despite/in spite of, phải thêm the fact that.",
        ],
        examples: [
          { en: "Despite the rain, the match continued.", vi: "Bất chấp trời mưa, trận đấu vẫn tiếp tục." },
          { en: "In spite of feeling ill, she went to work.", vi: "Dù cảm thấy mệt, cô ấy vẫn đi làm." },
          { en: "Despite the fact that he had no experience, he got the job.", vi: "Mặc dù không có kinh nghiệm, anh ấy vẫn nhận được công việc." },
        ],
      },
      {
        heading: "However, Nevertheless: nối hai câu",
        points: [
          "However và Nevertheless thường đứng đầu câu thứ hai, theo sau là dấu phẩy: ... . However, ...",
          "Cũng có thể dùng sau dấu chấm phẩy: The hotel was expensive; however, the service was excellent.",
          "Không dùng however như but để nối hai mệnh đề chỉ bằng dấu phẩy: ✗ It was cold, however we went out.",
          "Nevertheless trang trọng hơn, nhấn mạnh “dù vậy vẫn...”.",
        ],
        examples: [
          { en: "The hotel was expensive. However, the service was excellent.", vi: "Khách sạn đắt. Tuy nhiên, dịch vụ rất tuyệt." },
          { en: "He trained very hard. Nevertheless, he didn't win.", vi: "Anh ấy đã tập luyện rất chăm chỉ. Dù vậy, anh ấy vẫn không thắng." },
        ],
      },
      {
        heading: "Chỉ mục đích: to, in order to, so as to, so that",
        formulas: [
          { label: "Cùng chủ ngữ", pattern: "S + V + (in order) to / so as to + V" },
          { label: "Phủ định", pattern: "S + V + in order not to / so as not to + V" },
          { label: "So that", pattern: "S + V + so that + S + can / could / will / would + V" },
        ],
        points: [
          "in order to và so as to trang trọng hơn to.",
          "Ở dạng phủ định, nên dùng in order not to / so as not to (thường không dùng “not to” đứng một mình để chỉ mục đích).",
          "so that thường dùng khi hai vế có chủ ngữ khác nhau, hoặc khi cần can/could/will/would.",
        ],
        examples: [
          { en: "She left early in order to catch the first bus.", vi: "Cô ấy đi sớm để kịp chuyến xe buýt đầu tiên." },
          { en: "He spoke quietly so as not to wake the baby.", vi: "Anh ấy nói khẽ để không làm em bé thức giấc." },
          { en: "I'm saving money so that I can travel to Japan next year.", vi: "Tôi đang để dành tiền để năm sau có thể đi du lịch Nhật Bản." },
          { en: "I'll write the address down so that you don't forget it.", vi: "Tôi sẽ ghi địa chỉ ra để bạn không quên." },
        ],
      },
    ],
    mistakes: [
      {
        wrong: "Despite of the rain, we went out.",
        right: "Despite the rain, we went out. / In spite of the rain, we went out.",
        why: "Không có “despite of”. Dùng despite hoặc in spite of.",
      },
      {
        wrong: "Although the heavy rain, we went out.",
        right: "Although it was raining heavily, we went out. / Despite the heavy rain, we went out.",
        why: "although cần mệnh đề (S + V); trước danh từ phải dùng despite/in spite of.",
      },
      {
        wrong: "Although he was tired, but he kept working.",
        right: "Although he was tired, he kept working.",
        why: "Tiếng Việt nói “Mặc dù... nhưng...”, còn tiếng Anh chỉ dùng một từ nối: although HOẶC but.",
      },
      {
        wrong: "Despite he was tired, he kept working.",
        right: "Despite being tired, he kept working. / Despite the fact that he was tired, he kept working.",
        why: "Sau despite là danh từ/V-ing; nếu muốn dùng mệnh đề phải thêm the fact that.",
      },
      {
        wrong: "I study hard for passing the exam.",
        right: "I study hard to pass the exam. / I study hard so that I can pass the exam.",
        why: "Chỉ mục đích của hành động dùng to V / in order to V / so that, không dùng for + V-ing.",
      },
    ],
    exercises: [
      {
        kind: "choice",
        question: "___ the heavy traffic, we arrived on time.",
        options: ["Although", "Despite", "However", "Even though"],
        answer: 1,
        explain: "Sau chỗ trống là cụm danh từ (the heavy traffic) → despite. Although/even though cần mệnh đề.",
      },
      {
        kind: "choice",
        question: "___ she had studied hard, she failed the exam.",
        options: ["In spite of", "Despite", "Even though", "However"],
        answer: 2,
        explain: "Sau chỗ trống là mệnh đề (she had studied) → even though. Despite/in spite of cần danh từ/V-ing.",
      },
      {
        kind: "choice",
        question: "He wore a hat ___ get sunburnt.",
        options: ["so that not", "so as not to", "in order to", "for not"],
        answer: 1,
        explain: "Mục đích phủ định → so as not to + V. “in order to get sunburnt” có nghĩa ngược lại.",
      },
      {
        kind: "choice",
        question: "I'll write down the address ___ I don't forget it.",
        options: ["in order to", "so as to", "so that", "despite"],
        answer: 2,
        explain: "Sau chỗ trống là mệnh đề (I don't forget it) → so that. in order to / so as to cần động từ nguyên mẫu.",
      },
      {
        kind: "choice",
        question: "Ben is very outgoing, ___ his sister is quite shy.",
        options: ["whereas", "despite", "however", "in spite of"],
        answer: 0,
        explain:
          "So sánh đối lập hai người, nối hai mệnh đề → whereas. however không nối hai mệnh đề chỉ bằng dấu phẩy; despite/in spite of cần danh từ.",
      },
      {
        kind: "fill",
        question: "___ the fact that it was expensive, they bought the house.",
        hint: "despite / in spite of",
        answers: ["Despite", "In spite of"],
        explain: "Cấu trúc despite / in spite of + the fact that + mệnh đề. Cả hai đều đúng.",
      },
      {
        kind: "fill",
        question: "The weather was terrible. ___, we really enjoyed our trip.",
        hint: "từ nối tương phản đứng đầu câu",
        answers: ["However", "Nevertheless", "Nonetheless", "Even so", "Still"],
        explain: "Đầu câu mới, theo sau là dấu phẩy, nối ý tương phản với câu trước → However / Nevertheless.",
      },
      {
        kind: "fill",
        question: "She took a taxi ___ be late for the interview.",
        hint: "so as / not",
        answers: ["so as not to", "in order not to"],
        explain: "Mục đích phủ định → so as not to + V (hoặc in order not to + V).",
      },
    ],
  },
];
