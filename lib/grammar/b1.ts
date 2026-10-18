import type { GrammarTopic } from "./types";

export const B1_TOPICS: GrammarTopic[] = [
  // ---------------------------------------------------------------------------
  // 1. Present perfect vs past simple
  // ---------------------------------------------------------------------------
  {
    id: "b1-perfect-vs-past",
    level: "B1",
    title: "Hiện tại hoàn thành và Quá khứ đơn",
    titleEn: "Present perfect vs past simple",
    summary:
      "Phân biệt hai thì hay bị nhầm nhất: quá khứ đơn cho hành động đã xong tại thời điểm xác định trong quá khứ, hiện tại hoàn thành cho hành động không rõ thời gian hoặc còn liên quan đến hiện tại.",
    sections: [
      {
        heading: "Khác nhau ở đâu?",
        text: "Cả hai thì đều nói về việc đã xảy ra. Điểm khác nằm ở chỗ người nói có “nối” sự việc đó với hiện tại hay không.",
        points: [
          "Quá khứ đơn: hành động đã kết thúc tại một thời điểm xác định trong quá khứ (yesterday, last year, in 2019...). Câu chuyện đã khép lại, tách rời hiện tại.",
          "Hiện tại hoàn thành: thời điểm không được nói ra hoặc không quan trọng; điều quan trọng là kết quả, kinh nghiệm, hoặc khoảng thời gian kéo dài đến bây giờ.",
          "Mẹo nhanh: nếu câu có (hoặc ngầm hiểu) một mốc thời gian đã qua cụ thể → dùng quá khứ đơn.",
        ],
      },
      {
        heading: "Công thức",
        formulas: [
          { label: "HTHT – Khẳng định", pattern: "S + have/has + V3" },
          { label: "HTHT – Phủ định", pattern: "S + have/has + not + V3" },
          { label: "HTHT – Nghi vấn", pattern: "Have/Has + S + V3?" },
          { label: "QKĐ – Khẳng định", pattern: "S + V2" },
          { label: "QKĐ – Phủ định", pattern: "S + did not (didn't) + V" },
          { label: "QKĐ – Nghi vấn", pattern: "Did + S + V?" },
        ],
      },
      {
        heading: "Các trường hợp sử dụng",
        points: [
          "Thời gian xác định → quá khứ đơn; không nói thời gian, nói về kinh nghiệm → hiện tại hoàn thành.",
          "Kết quả còn ở hiện tại → hiện tại hoàn thành; chỉ kể lại sự việc đã qua → quá khứ đơn.",
          "Khoảng thời gian chưa kết thúc (today, this week, this year) → hiện tại hoàn thành; khoảng thời gian đã kết thúc (yesterday, last week) → quá khứ đơn.",
          "Mở đầu bằng hiện tại hoàn thành để đưa tin hoặc hỏi kinh nghiệm, sau đó kể chi tiết (khi nào, ở đâu, thế nào) bằng quá khứ đơn.",
          "Người đã mất hoặc thời kỳ đã kết thúc → quá khứ đơn.",
        ],
        examples: [
          { en: "I saw that film last week.", vi: "Tôi đã xem bộ phim đó tuần trước.", note: "Có mốc “last week” → quá khứ đơn." },
          { en: "I've seen that film. It's really good.", vi: "Tôi xem phim đó rồi. Hay lắm.", note: "Không nói khi nào, nói về trải nghiệm → HTHT." },
          { en: "I've lost my keys. I can't get into the house.", vi: "Tôi làm mất chìa khóa rồi. Tôi không vào nhà được.", note: "Kết quả hiện tại: vẫn chưa có chìa khóa." },
          { en: "I lost my keys yesterday, but I found them in my bag.", vi: "Hôm qua tôi làm mất chìa khóa, nhưng rồi tôi tìm thấy chúng trong túi.", note: "Chuyện đã xong, không còn ảnh hưởng → QKĐ." },
          { en: "I've drunk three cups of coffee today.", vi: "Hôm nay tôi đã uống ba cốc cà phê rồi.", note: "“Today” chưa kết thúc." },
          { en: "I drank three cups of coffee yesterday.", vi: "Hôm qua tôi đã uống ba cốc cà phê.", note: "“Yesterday” đã kết thúc." },
          { en: "Have you ever been to Japan? – Yes, I went there in 2019.", vi: "Bạn đã từng đến Nhật chưa? – Rồi, tôi đến đó năm 2019.", note: "Hỏi kinh nghiệm bằng HTHT, kể chi tiết bằng QKĐ." },
          { en: "Shakespeare wrote “Romeo and Juliet”.", vi: "Shakespeare đã viết “Romeo và Juliet”.", note: "Ông đã mất, sự việc đã khép lại → QKĐ." },
        ],
      },
      {
        heading: "Dấu hiệu nhận biết",
        table: {
          head: ["Hiện tại hoàn thành", "Quá khứ đơn"],
          rows: [
            ["ever, never, before (= trước đây)", "yesterday, the day before yesterday"],
            ["just, already, yet", "last night / last week / last year"],
            ["so far, up to now, until now", "... ago (two days ago, a long time ago)"],
            ["recently, lately", "in 2010, in May, on Monday"],
            ["for + khoảng thời gian (đến nay), since + mốc", "when I was a child, when I lived in..."],
            ["today, this week, this year (chưa kết thúc)", "câu hỏi với When? / What time?"],
          ],
        },
        points: [
          "Câu hỏi “When...?” luôn hỏi về thời điểm cụ thể nên dùng quá khứ đơn: When did you arrive? (không nói: When have you arrived?).",
          "“for” dùng được với cả hai thì: I've lived here for ten years (vẫn đang sống ở đây) / I lived there for ten years (giờ không còn sống ở đó).",
          "Trong tiếng Anh-Mỹ, với just, already, yet người ta cũng hay dùng quá khứ đơn (Did you eat yet?). Bài học này theo chuẩn Anh-Anh: dùng hiện tại hoàn thành.",
        ],
      },
      {
        heading: "Bảng so sánh",
        table: {
          head: ["", "Hiện tại hoàn thành", "Quá khứ đơn"],
          rows: [
            ["Thời gian", "Không nói ra / không quan trọng", "Xác định, đã qua"],
            ["Liên hệ với hiện tại", "Có (kết quả, kinh nghiệm, vẫn đang tiếp diễn)", "Không, sự việc đã khép lại"],
            ["Kinh nghiệm", "She has been to Paris twice.", "She went to Paris last summer."],
            ["Khoảng thời gian", "I've lived here for ten years. (vẫn ở đây)", "I lived there for ten years. (đã chuyển đi)"],
            ["Tin tức", "The police have arrested two men.", "They arrested them at 10 p.m. last night."],
          ],
        },
        examples: [
          { en: "My brother has worked in a bank since 2020.", vi: "Anh trai tôi làm ở ngân hàng từ năm 2020 (đến giờ)." },
          { en: "My grandfather worked in a bank for 30 years.", vi: "Ông tôi đã làm ở ngân hàng 30 năm (giờ ông đã nghỉ hưu)." },
        ],
      },
    ],
    mistakes: [
      { wrong: "I have seen him yesterday.", right: "I saw him yesterday.", why: "Có mốc thời gian xác định đã qua (yesterday) thì phải dùng quá khứ đơn." },
      { wrong: "When have you arrived?", right: "When did you arrive?", why: "Câu hỏi “When” hỏi thời điểm cụ thể nên dùng quá khứ đơn." },
      { wrong: "I live here since 2015.", right: "I have lived here since 2015.", why: "Hành động bắt đầu trong quá khứ và kéo dài đến nay (since) cần hiện tại hoàn thành, không dùng hiện tại đơn." },
      { wrong: "I have finished my homework two hours ago.", right: "I finished my homework two hours ago.", why: "“ago” chỉ thời điểm xác định trong quá khứ → quá khứ đơn." },
      { wrong: "Shakespeare has written many plays.", right: "Shakespeare wrote many plays.", why: "Người đã mất, khoảng thời gian đã kết thúc → quá khứ đơn." },
    ],
    exercises: [
      {
        kind: "choice",
        question: "We ___ to Da Lat last summer.",
        options: ["have gone", "went", "have been", "go"],
        answer: 1,
        explain: "“last summer” là thời điểm xác định đã qua → quá khứ đơn “went”. Hiện tại hoàn thành không đi với mốc thời gian đã qua.",
      },
      {
        kind: "choice",
        question: "My brother ___ in Hanoi since 2018.",
        options: ["lived", "lives", "has lived", "was living"],
        answer: 2,
        explain: "“since 2018” cho thấy hành động bắt đầu năm 2018 và kéo dài đến nay → hiện tại hoàn thành “has lived”.",
      },
      {
        kind: "fill",
        question: "We ___ to this city in 2015.",
        hint: "move",
        answers: ["moved"],
        explain: "“in 2015” là năm cụ thể đã qua → quá khứ đơn “moved”.",
      },
      {
        kind: "choice",
        question: "When ___ the letter? – Last Monday.",
        options: ["did you receive", "have you received", "are you receiving", "you received"],
        answer: 0,
        explain: "Câu hỏi “When” và câu trả lời “Last Monday” chỉ thời điểm xác định → quá khứ đơn “did you receive”.",
      },
      {
        kind: "choice",
        question: "I ___ three cups of coffee so far today.",
        options: ["drank", "was drinking", "drink", "have drunk"],
        answer: 3,
        explain: "“so far today” = tính đến lúc này trong ngày hôm nay (chưa kết thúc) → hiện tại hoàn thành “have drunk”.",
      },
      {
        kind: "fill",
        question: "My parents ___ married for 30 years. Their anniversary party is next week.",
        hint: "be",
        answers: ["have been", "'ve been"],
        explain: "Bố mẹ vẫn đang trong cuộc hôn nhân, kéo dài 30 năm đến nay → “have been married for 30 years”. Không nói “are married for 30 years”.",
      },
      {
        kind: "choice",
        question: "Leonardo da Vinci ___ the Mona Lisa.",
        options: ["has painted", "painted", "has been painting", "paints"],
        answer: 1,
        explain: "Leonardo da Vinci đã mất, sự việc thuộc về quá khứ đã khép lại → quá khứ đơn “painted”.",
      },
      {
        kind: "fill",
        question: "How many times ___ Hue so far?",
        hint: "you / visit",
        answers: ["have you visited"],
        explain: "“so far” (tính đến nay) và hỏi về số lần, kinh nghiệm → hiện tại hoàn thành, dạng câu hỏi: have you visited.",
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // 2. Present perfect continuous
  // ---------------------------------------------------------------------------
  {
    id: "b1-present-perfect-continuous",
    level: "B1",
    title: "Thì hiện tại hoàn thành tiếp diễn",
    titleEn: "Present perfect continuous",
    summary:
      "Dùng have/has been + V-ing để nói về hành động bắt đầu trong quá khứ, kéo dài đến hiện tại (hoặc vừa mới dừng), nhấn mạnh quá trình và độ dài thời gian.",
    sections: [
      {
        heading: "Khi nào dùng?",
        text: "Thì hiện tại hoàn thành tiếp diễn diễn tả một hành động đã bắt đầu trong quá khứ và đang kéo dài đến bây giờ, hoặc vừa mới dừng lại. Trọng tâm là quá trình: làm trong bao lâu, làm liên tục.",
        points: [
          "Hành động kéo dài đến hiện tại và có thể vẫn tiếp tục: I've been learning English for three years.",
          "Hành động vừa mới dừng, kết quả hay dấu vết vẫn còn thấy được: You're out of breath. Have you been running?",
          "Hành động lặp đi lặp lại trong thời gian gần đây: She's been calling me all morning.",
        ],
      },
      {
        heading: "Công thức",
        formulas: [
          { label: "Khẳng định", pattern: "S + have/has + been + V-ing" },
          { label: "Phủ định", pattern: "S + have/has + not + been + V-ing" },
          { label: "Nghi vấn", pattern: "Have/Has + S + been + V-ing?" },
          { label: "Hỏi thời lượng", pattern: "How long + have/has + S + been + V-ing?" },
        ],
        points: [
          "I/You/We/They + have been; He/She/It + has been.",
          "Dạng rút gọn: I've been, she's been, haven't been, hasn't been.",
        ],
      },
      {
        heading: "Ví dụ theo cách dùng",
        examples: [
          { en: "I've been learning English for three years.", vi: "Tôi đã học tiếng Anh được ba năm rồi (và vẫn đang học)." },
          { en: "How long have you been waiting?", vi: "Bạn đợi bao lâu rồi?" },
          { en: "We've been waiting since 7 o'clock.", vi: "Chúng tôi đã đợi từ 7 giờ." },
          { en: "It's been raining. The ground is wet.", vi: "Trời vừa mưa. Mặt đất ướt hết.", note: "Mưa vừa tạnh, dấu vết còn đó." },
          { en: "You're out of breath. Have you been running?", vi: "Bạn thở hổn hển kìa. Bạn vừa chạy à?" },
          { en: "She's been calling me all morning.", vi: "Cả buổi sáng cô ấy cứ gọi cho tôi suốt.", note: "Hành động lặp lại." },
          { en: "He hasn't been sleeping well recently.", vi: "Dạo này anh ấy ngủ không ngon." },
        ],
      },
      {
        heading: "Dấu hiệu và lưu ý",
        points: [
          "Hay đi với: for (+ khoảng thời gian), since (+ mốc), How long...?, all day, all morning, recently, lately.",
          "Động từ chỉ trạng thái (know, like, love, want, believe, understand, own, belong, need...) KHÔNG dùng dạng tiếp diễn → dùng hiện tại hoàn thành: I've known her for years (không nói: I've been knowing).",
          "Với live và work, dùng thì nào cũng được, nghĩa gần như nhau: I've lived / I've been living here since 2020.",
          "Khi nói về số lượng, số lần (How much? How many?) → dùng hiện tại hoàn thành, không dùng tiếp diễn.",
        ],
      },
      {
        heading: "So sánh với hiện tại hoàn thành",
        table: {
          head: ["", "Hiện tại hoàn thành", "Hiện tại hoàn thành tiếp diễn"],
          rows: [
            ["Nhấn mạnh", "Kết quả, việc đã xong", "Quá trình, độ dài thời gian"],
            ["Câu hỏi", "How much? / How many?", "How long?"],
            ["Ví dụ 1", "I've painted the room. (sơn xong rồi)", "I've been painting the room. (có thể chưa xong, tay còn dính sơn)"],
            ["Ví dụ 2", "I've written three emails this morning.", "I've been writing emails all morning."],
            ["Động từ trạng thái", "I've known him since 2010. ✔", "I've been knowing him... ✘"],
          ],
        },
        examples: [
          { en: "I've read three books this month.", vi: "Tháng này tôi đã đọc được ba cuốn sách.", note: "Đếm số lượng → HTHT." },
          { en: "I've been reading this book for two weeks.", vi: "Tôi đọc cuốn sách này được hai tuần rồi (vẫn chưa xong).", note: "Nhấn mạnh thời gian → HTHT tiếp diễn." },
        ],
      },
    ],
    mistakes: [
      { wrong: "I am learning English for three years.", right: "I have been learning English for three years.", why: "Hành động kéo dài từ quá khứ đến nay với “for” không dùng hiện tại tiếp diễn mà dùng hiện tại hoàn thành tiếp diễn." },
      { wrong: "I have been knowing him since 2010.", right: "I have known him since 2010.", why: "“know” là động từ trạng thái, không dùng dạng tiếp diễn." },
      { wrong: "I've been reading three books this month.", right: "I've read three books this month.", why: "Khi nói số lượng đã hoàn thành (three books) → dùng hiện tại hoàn thành." },
      { wrong: "How long are you waiting?", right: "How long have you been waiting?", why: "Hỏi thời lượng từ quá khứ đến hiện tại → How long + have/has + S + been + V-ing." },
      { wrong: "She has been work here since May.", right: "She has been working here since May.", why: "Sau “been” phải là V-ing." },
    ],
    exercises: [
      {
        kind: "choice",
        question: "It ___ since this morning. The streets are flooded.",
        options: ["is raining", "has been raining", "rained", "rains"],
        answer: 1,
        explain: "Mưa bắt đầu từ sáng và kéo dài đến bây giờ (since this morning) → “has been raining”. Không dùng hiện tại tiếp diễn hay quá khứ đơn với “since” kiểu này.",
      },
      {
        kind: "choice",
        question: "I ___ him for over twenty years.",
        options: ["have been knowing", "am knowing", "have known", "know"],
        answer: 2,
        explain: "“know” là động từ trạng thái nên không dùng tiếp diễn; kéo dài đến nay với “for” → hiện tại hoàn thành “have known”.",
      },
      {
        kind: "choice",
        question: "She ___ four cups of tea this afternoon.",
        options: ["has been drinking", "is drinking", "has drunk", "drinks"],
        answer: 2,
        explain: "Có số lượng cụ thể (four cups) → nhấn mạnh kết quả → hiện tại hoàn thành “has drunk”, không dùng tiếp diễn.",
      },
      {
        kind: "choice",
        question: "Why are your hands so dirty? – I ___ in the garden.",
        options: ["have been working", "work", "will work", "had worked"],
        answer: 0,
        explain: "Hành động vừa mới dừng và để lại dấu vết (tay bẩn) → “have been working”.",
      },
      {
        kind: "choice",
        question: "You look frozen! How long ___ for the bus?",
        options: ["are you waiting", "do you wait", "you have been waiting", "have you been waiting"],
        answer: 3,
        explain: "Hỏi thời lượng từ quá khứ đến hiện tại → How long + have + you + been + V-ing. “you have been waiting” sai trật tự câu hỏi.",
      },
      {
        kind: "fill",
        question: "I ___ to call you for an hour now! Where have you been?",
        hint: "try",
        answers: ["have been trying", "'ve been trying"],
        explain: "Hành động lặp lại, kéo dài suốt một tiếng đến tận bây giờ (for an hour now) → “have been trying”.",
      },
      {
        kind: "fill",
        question: "How long ___ English? – Since I was ten, and I'm still learning.",
        hint: "you / learn",
        answers: ["have you been learning"],
        explain: "Hỏi về khoảng thời gian của một hành động vẫn đang tiếp diễn → How long have you been learning...?",
      },
      {
        kind: "fill",
        question: "She ___ here since January, and she really enjoys it.",
        hint: "work",
        answers: ["has been working", "has worked", "'s been working", "'s worked"],
        explain: "Với “work” (và “live”), cả hiện tại hoàn thành tiếp diễn “has been working” và hiện tại hoàn thành “has worked” đều đúng, nghĩa gần như nhau.",
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // 3. Past perfect
  // ---------------------------------------------------------------------------
  {
    id: "b1-past-perfect",
    level: "B1",
    title: "Thì quá khứ hoàn thành",
    titleEn: "Past perfect",
    summary:
      "Dùng had + V3 để nói về việc đã xảy ra trước một hành động hoặc một mốc khác trong quá khứ; làm quen thêm với quá khứ hoàn thành tiếp diễn.",
    sections: [
      {
        heading: "Khi nào dùng?",
        text: "Quá khứ hoàn thành là “quá khứ của quá khứ”. Khi kể chuyện bằng quá khứ đơn, nếu muốn nhắc tới một việc đã xảy ra TRƯỚC thời điểm đang kể, ta dùng quá khứ hoàn thành.",
        examples: [
          { en: "When I arrived at the party, Mai had gone home.", vi: "Khi tôi đến bữa tiệc thì Mai đã về nhà rồi.", note: "Mai về trước, tôi đến sau." },
          { en: "When I arrived at the party, Mai went home.", vi: "Khi tôi đến bữa tiệc thì Mai (mới) về nhà.", note: "Tôi đến trước, Mai về sau." },
        ],
      },
      {
        heading: "Công thức",
        formulas: [
          { label: "Khẳng định", pattern: "S + had + V3" },
          { label: "Phủ định", pattern: "S + had not (hadn't) + V3" },
          { label: "Nghi vấn", pattern: "Had + S + V3?" },
          { label: "Trả lời ngắn", pattern: "Yes, S + had. / No, S + hadn't." },
        ],
        points: [
          "“had” dùng cho mọi ngôi: I/you/he/she/it/we/they had.",
          "Dạng rút gọn: I'd, she'd, they'd... (= I had). Chú ý phân biệt với I'd = I would: sau “I'd” mà là V3 thì đó là “had”.",
        ],
      },
      {
        heading: "Các cách dùng chính",
        examples: [
          { en: "When we got to the cinema, the film had already started.", vi: "Khi chúng tôi đến rạp thì phim đã bắt đầu rồi." },
          { en: "By 2010, she had lived in five different countries.", vi: "Tính đến năm 2010, cô ấy đã sống ở năm nước khác nhau.", note: "Trước một mốc thời gian trong quá khứ." },
          { en: "It was the first time I had ever flown on a plane.", vi: "Đó là lần đầu tiên tôi đi máy bay.", note: "Kinh nghiệm tính đến một thời điểm trong quá khứ." },
          { en: "I didn't recognise him because he had changed a lot.", vi: "Tôi không nhận ra anh ấy vì anh ấy đã thay đổi nhiều quá.", note: "Giải thích nguyên nhân xảy ra trước." },
          { en: "She said she had lost her phone.", vi: "Cô ấy nói rằng cô ấy đã làm mất điện thoại.", note: "Trong câu tường thuật." },
          { en: "Had you ever been to London before you moved there?", vi: "Trước khi chuyển đến London, bạn đã từng đến đó chưa?" },
        ],
      },
      {
        heading: "Từ nối và lưu ý",
        points: [
          "Hay đi với: by the time, before, after, when, already, just, never... before, until, by + mốc thời gian.",
          "By the time + quá khứ đơn, S + had + V3: By the time the police came, the thief had escaped.",
          "Với before/after, thứ tự đã rõ nên quá khứ đơn cũng chấp nhận được: After she (had) finished her homework, she went out.",
          "Nếu chỉ kể các hành động liên tiếp theo đúng thứ tự xảy ra → dùng quá khứ đơn, không cần quá khứ hoàn thành: I got up, had a shower and went to work.",
          "Không dùng quá khứ hoàn thành khi không có mốc quá khứ nào khác để so sánh: Yesterday I met an old friend (không nói: Yesterday I had met...).",
        ],
      },
      {
        heading: "Sơ lược: quá khứ hoàn thành tiếp diễn",
        text: "Giống mối quan hệ giữa hiện tại hoàn thành và hiện tại hoàn thành tiếp diễn, nhưng lùi về quá khứ: nhấn mạnh một hành động kéo dài liên tục cho đến (hoặc ngay trước) một thời điểm trong quá khứ.",
        formulas: [{ label: "Khẳng định", pattern: "S + had been + V-ing" }],
        examples: [
          { en: "She was tired because she had been working all day.", vi: "Cô ấy mệt vì đã làm việc cả ngày." },
          { en: "I had been waiting for an hour when the bus finally came.", vi: "Tôi đã đợi được một tiếng thì xe buýt mới đến." },
        ],
      },
      {
        heading: "Bảng so sánh",
        table: {
          head: ["", "Quá khứ đơn", "Quá khứ hoàn thành"],
          rows: [
            ["Công thức", "S + V2", "S + had + V3"],
            ["Vai trò", "Hành động chính, mốc thời gian trong câu chuyện", "Hành động xảy ra trước mốc đó"],
            ["Ví dụ", "When I got home, my family ate dinner. (tôi về rồi cả nhà mới ăn)", "When I got home, my family had eaten dinner. (cả nhà ăn xong trước khi tôi về)"],
          ],
        },
      },
    ],
    mistakes: [
      { wrong: "When I arrived, the train already left.", right: "When I arrived, the train had already left.", why: "Tàu rời đi trước khi tôi đến → hành động xảy ra trước dùng quá khứ hoàn thành." },
      { wrong: "By the time we got there, the shop closed.", right: "By the time we got there, the shop had closed.", why: "Sau mệnh đề “By the time + quá khứ đơn”, mệnh đề chính dùng quá khứ hoàn thành." },
      { wrong: "I had finished my homework and then I had watched TV.", right: "I finished my homework and then I watched TV.", why: "Các hành động kể theo đúng thứ tự thì dùng quá khứ đơn, không lạm dụng quá khứ hoàn thành." },
      { wrong: "She had went home.", right: "She had gone home.", why: "Sau “had” phải là V3 (gone), không phải V2 (went)." },
      { wrong: "Yesterday I had met an old friend.", right: "Yesterday I met an old friend.", why: "Không có mốc quá khứ nào khác để so sánh → dùng quá khứ đơn." },
    ],
    exercises: [
      {
        kind: "choice",
        question: "When we arrived at the station, the train ___. We had to wait for the next one.",
        options: ["has already left", "had already left", "already leaves", "will already leave"],
        answer: 1,
        explain: "Tàu rời ga trước khi chúng tôi đến (một mốc trong quá khứ) → quá khứ hoàn thành “had already left”.",
      },
      {
        kind: "choice",
        question: "By the time the police came, the thief ___.",
        options: ["has escaped", "escapes", "had escaped", "was escape"],
        answer: 2,
        explain: "“By the time + quá khứ đơn” → hành động trong mệnh đề chính xảy ra trước đó, dùng “had escaped”.",
      },
      {
        kind: "fill",
        question: "When I got to the office, I realised I ___ my laptop at home.",
        hint: "leave",
        answers: ["had left", "'d left"],
        explain: "Việc để quên laptop xảy ra trước lúc đến văn phòng và nhận ra → quá khứ hoàn thành “had left”.",
      },
      {
        kind: "choice",
        question: "It was the first time I ___ snow.",
        options: ["had seen", "have seen", "am seeing", "see"],
        answer: 0,
        explain: "Cấu trúc “It was the first time + S + had + V3” (lần đầu tiên tính đến một thời điểm trong quá khứ). “have seen” đi với “It is the first time”.",
      },
      {
        kind: "choice",
        question: "She was tired because she ___ all day.",
        options: ["has been working", "is working", "works", "had been working"],
        answer: 3,
        explain: "Hành động kéo dài liên tục đến một thời điểm trong quá khứ (lúc cô ấy mệt) → quá khứ hoàn thành tiếp diễn “had been working”.",
      },
      {
        kind: "fill",
        question: "They ___ anything since breakfast, so they were starving.",
        hint: "not / eat",
        answers: ["hadn't eaten", "had not eaten"],
        explain: "Câu chuyện ở quá khứ (were starving); việc không ăn kéo dài từ bữa sáng đến lúc đó → “hadn't eaten”.",
      },
      {
        kind: "choice",
        question: "I didn't recognise him because he ___ a lot.",
        options: ["has changed", "had changed", "changes", "was change"],
        answer: 1,
        explain: "Anh ấy thay đổi trước thời điểm tôi gặp lại (didn't recognise) → “had changed”.",
      },
      {
        kind: "fill",
        question: "___ to London before you moved there?",
        hint: "you / ever / be",
        answers: ["Had you ever been"],
        explain: "Hỏi về kinh nghiệm tính đến một thời điểm trong quá khứ (trước khi chuyển đến) → Had + S + ever + V3?",
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // 4. Passive
  // ---------------------------------------------------------------------------
  {
    id: "b1-passive",
    level: "B1",
    title: "Câu bị động cơ bản",
    titleEn: "The passive",
    summary:
      "Câu bị động (be + V3) dùng khi muốn nhấn mạnh đối tượng chịu tác động hơn là người thực hiện. Bài học gồm công thức ở các thì thường gặp, cách chuyển từ chủ động sang bị động và khi nào cần “by”.",
    sections: [
      {
        heading: "Câu bị động là gì? Khi nào dùng?",
        text: "Trong câu chủ động, chủ ngữ là người/vật thực hiện hành động. Trong câu bị động, chủ ngữ là người/vật chịu tác động của hành động.",
        points: [
          "Khi không biết ai làm: My bike has been stolen.",
          "Khi người làm không quan trọng hoặc quá hiển nhiên: English is spoken in many countries.",
          "Khi muốn nhấn mạnh sự vật, kết quả (thường gặp trong tin tức, khoa học, văn bản trang trọng).",
          "Chỉ ngoại động từ (động từ có tân ngữ) mới có bị động. Các động từ như happen, arrive, die, sleep không có dạng bị động.",
        ],
      },
      {
        heading: "Công thức chung",
        formulas: [
          { label: "Khẳng định", pattern: "S + be + V3 (+ by O)" },
          { label: "Phủ định", pattern: "S + be + not + V3" },
          { label: "Nghi vấn", pattern: "Be + S + V3?" },
        ],
        points: [
          "“be” được chia theo thì của câu và hợp với chủ ngữ mới; động từ chính luôn ở dạng V3.",
          "Với thì có trợ động từ (will, have, modal), “be” đổi thành: will be, have been, can be...",
        ],
      },
      {
        heading: "Bị động ở các thì",
        table: {
          head: ["Thì", "Công thức bị động", "Ví dụ"],
          rows: [
            ["Hiện tại đơn", "am/is/are + V3", "English is spoken here."],
            ["Hiện tại tiếp diễn", "am/is/are being + V3", "The road is being repaired."],
            ["Quá khứ đơn", "was/were + V3", "This house was built in 1990."],
            ["Quá khứ tiếp diễn", "was/were being + V3", "The room was being cleaned."],
            ["Hiện tại hoàn thành", "have/has been + V3", "My bike has been stolen."],
            ["Tương lai đơn", "will be + V3", "The results will be announced tomorrow."],
            ["Động từ khuyết thiếu", "can/must/should... + be + V3", "This form must be signed."],
          ],
        },
        examples: [
          { en: "English is spoken in many countries.", vi: "Tiếng Anh được nói ở nhiều nước." },
          { en: "The road is being repaired, so we have to take another way.", vi: "Con đường đang được sửa nên chúng ta phải đi đường khác." },
          { en: "This house was built in 1990.", vi: "Ngôi nhà này được xây năm 1990." },
          { en: "My bike has been stolen!", vi: "Xe đạp của tôi bị lấy cắp rồi!" },
          { en: "The results will be announced tomorrow.", vi: "Kết quả sẽ được công bố vào ngày mai." },
          { en: "This form must be signed by a parent.", vi: "Mẫu đơn này phải được phụ huynh ký." },
          { en: "I was born in 2005.", vi: "Tôi sinh năm 2005.", note: "“be born” luôn ở dạng bị động." },
        ],
      },
      {
        heading: "Chuyển câu chủ động sang bị động",
        points: [
          "Bước 1: Tân ngữ của câu chủ động → chủ ngữ của câu bị động.",
          "Bước 2: Thêm “be” chia đúng thì của câu chủ động và hợp với chủ ngữ mới.",
          "Bước 3: Động từ chính → V3.",
          "Bước 4: Chủ ngữ cũ → “by + tân ngữ” (chỉ khi cần thiết).",
        ],
        examples: [
          { en: "Tom cleans the kitchen every day. → The kitchen is cleaned by Tom every day.", vi: "Tom dọn bếp mỗi ngày. → Bếp được Tom dọn mỗi ngày." },
          { en: "They built this bridge in 1995. → This bridge was built in 1995.", vi: "Họ xây cây cầu này năm 1995. → Cây cầu này được xây năm 1995.", note: "Bỏ “by them” vì không cần thiết." },
          { en: "Someone has stolen my wallet. → My wallet has been stolen.", vi: "Ai đó đã lấy cắp ví của tôi. → Ví của tôi bị lấy cắp rồi." },
        ],
      },
      {
        heading: "Khi nào dùng “by”?",
        points: [
          "Chỉ dùng “by + người/vật thực hiện” khi thông tin đó quan trọng hoặc là thông tin mới: “Romeo and Juliet” was written by Shakespeare.",
          "Bỏ “by” khi người thực hiện là: people, someone, somebody, they, we, you, by me... hoặc không rõ, không quan trọng.",
          "Câu hỏi bị động: đưa “be” (hoặc trợ động từ đầu tiên) lên trước chủ ngữ: Was the window broken by the children? / Has the parcel been delivered?",
        ],
        examples: [
          { en: "This song was written by a 15-year-old girl.", vi: "Bài hát này do một cô bé 15 tuổi sáng tác.", note: "Người viết là thông tin đáng chú ý → giữ “by”." },
        ],
      },
    ],
    mistakes: [
      { wrong: "The letter was wrote yesterday.", right: "The letter was written yesterday.", why: "Bị động dùng V3 (written), không dùng V2 (wrote)." },
      { wrong: "This house built in 1990.", right: "This house was built in 1990.", why: "Thiếu “be”. Câu bị động luôn cần be + V3." },
      { wrong: "The accident was happened last night.", right: "The accident happened last night.", why: "“happen” là nội động từ (không có tân ngữ) nên không có dạng bị động." },
      { wrong: "My car is repairing now.", right: "My car is being repaired now.", why: "Xe không tự sửa → cần bị động tiếp diễn: is being + V3." },
      { wrong: "I born in 2005.", right: "I was born in 2005.", why: "“Sinh ra” trong tiếng Anh luôn là “be born”." },
    ],
    exercises: [
      {
        kind: "choice",
        question: "Paper ___ from wood.",
        options: ["makes", "is made", "made", "is making"],
        answer: 1,
        explain: "Giấy không tự làm ra mà “được làm” từ gỗ; đây là sự thật chung → bị động hiện tại đơn “is made”.",
      },
      {
        kind: "choice",
        question: "The new bridge ___ next year.",
        options: ["will complete", "completes", "will be completed", "is completing"],
        answer: 2,
        explain: "Cây cầu “được hoàn thành” (bị động), trong tương lai (next year) → will be + V3.",
      },
      {
        kind: "choice",
        question: "Look! The old cinema ___ down.",
        options: ["is pulling", "is being pulled", "was pulled", "pulls"],
        answer: 1,
        explain: "“Look!” → đang xảy ra; rạp chiếu phim “bị” phá → bị động hiện tại tiếp diễn “is being pulled”.",
      },
      {
        kind: "fill",
        question: "The Mona Lisa ___ by Leonardo da Vinci.",
        hint: "paint",
        answers: ["was painted"],
        explain: "Bức tranh “được vẽ” trong quá khứ, người vẽ là thông tin quan trọng nên giữ “by” → was painted.",
      },
      {
        kind: "choice",
        question: "My phone ___. I can't find it anywhere.",
        options: ["has stolen", "stole", "is stealing", "has been stolen"],
        answer: 3,
        explain: "Điện thoại “bị lấy cắp”, kết quả còn ở hiện tại (không tìm thấy) → bị động hiện tại hoàn thành “has been stolen”. “has stolen” là chủ động (điện thoại đi ăn cắp) nên sai.",
      },
      {
        kind: "fill",
        question: "The meeting ___ yesterday because the manager was ill.",
        hint: "cancel",
        answers: ["was cancelled", "was canceled"],
        explain: "Cuộc họp “bị hủy”, xảy ra hôm qua → bị động quá khứ đơn “was cancelled” (Anh-Mỹ viết “canceled”).",
      },
      {
        kind: "choice",
        question: "This medicine ___ by children under 12.",
        options: ["shouldn't be taken", "shouldn't take", "shouldn't taken", "isn't taking"],
        answer: 0,
        explain: "Bị động với động từ khuyết thiếu: modal + be + V3 → “shouldn't be taken”. Thiếu “be” là sai.",
      },
      {
        kind: "fill",
        question: "Credit cards ___ in this shop. You have to pay in cash.",
        hint: "not / accept",
        answers: ["aren't accepted", "are not accepted"],
        explain: "Thẻ “không được chấp nhận” – sự thật hiện tại → bị động hiện tại đơn phủ định: are not accepted.",
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // 5. Zero and first conditionals
  // ---------------------------------------------------------------------------
  {
    id: "b1-conditionals-01",
    level: "B1",
    title: "Câu điều kiện loại 0 và loại 1",
    titleEn: "Zero and first conditionals",
    summary:
      "Câu điều kiện loại 0 nói về sự thật, quy luật luôn đúng; loại 1 nói về tình huống có thể xảy ra ở hiện tại hoặc tương lai. Học thêm unless, as long as, provided that và phân biệt in case với if.",
    sections: [
      {
        heading: "Hai loại câu điều kiện này dùng khi nào?",
        points: [
          "Loại 0: sự thật hiển nhiên, quy luật tự nhiên, kết quả luôn luôn xảy ra khi có điều kiện. “if” gần nghĩa với “when/whenever”.",
          "Loại 1: một điều kiện có thể xảy ra ở hiện tại hoặc tương lai, và kết quả có khả năng xảy ra.",
        ],
        examples: [
          { en: "If you heat ice, it melts.", vi: "Nếu bạn đun nóng đá, nó sẽ tan.", note: "Loại 0 – quy luật." },
          { en: "If it rains tomorrow, we'll stay at home.", vi: "Nếu ngày mai trời mưa, chúng ta sẽ ở nhà.", note: "Loại 1 – có thể xảy ra." },
        ],
      },
      {
        heading: "Công thức",
        formulas: [
          { label: "Loại 0", pattern: "If + S + V (hiện tại đơn), S + V (hiện tại đơn)" },
          { label: "Loại 1", pattern: "If + S + V (hiện tại đơn), S + will/won't + V" },
          { label: "Loại 1 – biến thể", pattern: "If + S + V (hiện tại đơn), S + can/may/might/should + V" },
          { label: "Loại 1 – mệnh lệnh", pattern: "If + S + V (hiện tại đơn), V (mệnh lệnh)..." },
        ],
        points: [
          "Mệnh đề if có thể đứng trước hoặc sau. Khi if đứng đầu câu thì có dấu phẩy; khi if đứng sau thì thường không có dấu phẩy: We'll stay at home if it rains.",
        ],
      },
      {
        heading: "Ví dụ",
        examples: [
          { en: "If you mix red and white, you get pink.", vi: "Nếu trộn màu đỏ với màu trắng, bạn được màu hồng." },
          { en: "If I drink coffee in the evening, I can't sleep.", vi: "Nếu uống cà phê vào buổi tối là tôi không ngủ được.", note: "Loại 0 – thói quen, điều luôn xảy ra với bản thân." },
          { en: "If you study hard, you'll pass the exam.", vi: "Nếu bạn học chăm, bạn sẽ đỗ kỳ thi." },
          { en: "If she doesn't hurry, she'll miss the bus.", vi: "Nếu cô ấy không nhanh lên thì sẽ lỡ xe buýt." },
          { en: "If you see Tom, tell him to call me.", vi: "Nếu bạn gặp Tom, bảo anh ấy gọi cho tôi nhé." },
          { en: "If we leave now, we might get there on time.", vi: "Nếu đi ngay bây giờ, có lẽ chúng ta sẽ đến kịp." },
        ],
      },
      {
        heading: "Không dùng “will” trong mệnh đề if",
        points: [
          "Dù nói về tương lai, mệnh đề if dùng hiện tại đơn: If it rains tomorrow... (không nói: If it will rain tomorrow...).",
          "Quy tắc này cũng áp dụng sau when, as soon as, before, after, until, unless, as long as, in case khi nói về tương lai: I'll call you when I arrive.",
          "Phân biệt if và when: when dùng cho việc chắc chắn sẽ xảy ra (I'll call you when I get home), if dùng cho việc có thể xảy ra hoặc không (I'll call you if I have time).",
          "Ngoại lệ ít gặp: “If you will wait a moment, ...” mang nghĩa lịch sự “nếu anh vui lòng”. Ở trình độ này chỉ cần nhớ quy tắc chung.",
        ],
      },
      {
        heading: "unless, as long as, provided that, in case",
        table: {
          head: ["Từ", "Nghĩa", "Ví dụ"],
          rows: [
            ["unless", "trừ khi = if ... not", "Unless you hurry, you'll miss the bus. (= If you don't hurry...)"],
            ["as long as", "miễn là, với điều kiện là", "You can borrow my car as long as you drive carefully."],
            ["provided (that) / providing", "với điều kiện là (trang trọng hơn)", "I'll lend you the money provided that you pay it back next week."],
            ["in case", "phòng khi, đề phòng", "Take an umbrella in case it rains."],
          ],
        },
        points: [
          "“unless” đã mang nghĩa phủ định nên KHÔNG dùng thêm “not” trong mệnh đề unless: Unless you study... (không nói: Unless you don't study...).",
          "in case ≠ if: “Take an umbrella in case it rains” = mang ô ngay bây giờ để đề phòng, dù có mưa hay không. “Take an umbrella if it rains” = chỉ mang ô khi trời mưa.",
          "Sau in case cũng dùng hiện tại đơn, không dùng will.",
        ],
        examples: [
          { en: "I'll write down the address in case I forget it.", vi: "Tôi sẽ ghi lại địa chỉ, phòng khi tôi quên." },
          { en: "You won't get better unless you take your medicine.", vi: "Bạn sẽ không khỏi bệnh nếu không uống thuốc." },
        ],
      },
    ],
    mistakes: [
      { wrong: "If it will rain, we will stay at home.", right: "If it rains, we will stay at home.", why: "Không dùng “will” trong mệnh đề if; dùng hiện tại đơn dù nói về tương lai." },
      { wrong: "Unless you don't study, you will fail.", right: "Unless you study, you will fail.", why: "“unless” = if not, đã mang nghĩa phủ định nên không thêm “don't”." },
      { wrong: "Take your phone if you get lost.", right: "Take your phone in case you get lost.", why: "Mang theo điện thoại để đề phòng → dùng “in case”. “if you get lost” nghĩa là chỉ mang điện thoại khi đã bị lạc, không hợp lý." },
      { wrong: "I will call you when I will arrive.", right: "I will call you when I arrive.", why: "Sau “when” nói về tương lai cũng dùng hiện tại đơn, không dùng will." },
    ],
    exercises: [
      {
        kind: "choice",
        question: "If you ___ water to 100°C, it boils.",
        options: ["heat", "will heat", "heated", "are heating"],
        answer: 0,
        explain: "Quy luật tự nhiên → câu điều kiện loại 0: If + hiện tại đơn, hiện tại đơn → “heat”.",
      },
      {
        kind: "choice",
        question: "If it ___ tomorrow, we'll cancel the picnic.",
        options: ["will rain", "rains", "rained", "rain"],
        answer: 1,
        explain: "Loại 1: mệnh đề if dùng hiện tại đơn, kể cả khi nói về tương lai. Chủ ngữ “it” → “rains”. Không dùng “will rain” sau if.",
      },
      {
        kind: "choice",
        question: "You won't pass the exam ___ you study harder.",
        options: ["if", "unless", "in case", "as long as"],
        answer: 1,
        explain: "“unless” = if not: Bạn sẽ không đỗ nếu không học chăm hơn. Dùng “if” hay “as long as” sẽ thành vô lý (học chăm hơn thì không đỗ).",
      },
      {
        kind: "fill",
        question: "If you ___, you'll miss the train.",
        hint: "not / hurry",
        answers: ["don't hurry", "do not hurry"],
        explain: "Loại 1: mệnh đề if ở hiện tại đơn, phủ định với chủ ngữ “you” → don't hurry.",
      },
      {
        kind: "choice",
        question: "Take an umbrella ___ it rains later.",
        options: ["unless", "provided that", "as long as", "in case"],
        answer: 3,
        explain: "Mang ô bây giờ để đề phòng trời mưa → “in case”. “unless/provided that/as long as” không hợp nghĩa.",
      },
      {
        kind: "fill",
        question: "I'll phone you as soon as I ___ at the airport.",
        hint: "arrive",
        answers: ["arrive"],
        explain: "Sau “as soon as” khi nói về tương lai dùng hiện tại đơn, không dùng will → arrive.",
      },
      {
        kind: "choice",
        question: "You can use my laptop ___ you're careful with it.",
        options: ["unless", "in case", "as long as", "so that"],
        answer: 2,
        explain: "“as long as” = miễn là, với điều kiện là: Bạn có thể dùng laptop của tôi miễn là bạn cẩn thận.",
      },
      {
        kind: "fill",
        question: "If she ___ the bus, she will be late for work.",
        hint: "miss",
        answers: ["misses"],
        explain: "Loại 1: If + hiện tại đơn; chủ ngữ “she” → misses.",
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // 6. Second conditional
  // ---------------------------------------------------------------------------
  {
    id: "b1-conditional-2",
    level: "B1",
    title: "Câu điều kiện loại 2",
    titleEn: "Second conditional",
    summary:
      "Câu điều kiện loại 2 dùng để nói về tình huống không có thật hoặc khó xảy ra ở hiện tại/tương lai. Học cách dùng “were” cho mọi ngôi, lời khuyên “If I were you” và phân biệt với loại 1.",
    sections: [
      {
        heading: "Khi nào dùng?",
        text: "Dùng câu điều kiện loại 2 khi tưởng tượng một tình huống trái với thực tế ở hiện tại, hoặc một việc rất khó xảy ra trong tương lai. Động từ ở dạng quá khứ nhưng nghĩa là hiện tại.",
        examples: [
          { en: "If I had a lot of money, I would travel around the world.", vi: "Nếu tôi có nhiều tiền, tôi sẽ đi du lịch vòng quanh thế giới.", note: "Thực tế: tôi không có nhiều tiền." },
          { en: "If I lived near the sea, I would swim every day.", vi: "Nếu tôi sống gần biển, ngày nào tôi cũng đi bơi.", note: "Thực tế: tôi không sống gần biển." },
        ],
      },
      {
        heading: "Công thức",
        formulas: [
          { label: "Khẳng định", pattern: "If + S + V2/were, S + would + V" },
          { label: "Phủ định", pattern: "If + S + didn't + V, S + wouldn't + V" },
          { label: "Biến thể", pattern: "If + S + V2/were, S + could/might + V" },
          { label: "Câu hỏi", pattern: "What would + S + V + if + S + V2?" },
        ],
        points: [
          "would ('d) + V nguyên mẫu, không “to”: I'd buy (= I would buy).",
          "could = would be able to (có thể làm được); might = có lẽ sẽ.",
          "Không dùng “would” trong mệnh đề if: If I had... (không nói: If I would have...).",
        ],
      },
      {
        heading: "“were” cho mọi ngôi và lời khuyên “If I were you”",
        points: [
          "Trong câu điều kiện loại 2, động từ “be” dùng “were” cho tất cả các ngôi: If I were rich..., If she were here...",
          "Trong văn nói thân mật, “was” cũng được chấp nhận với I/he/she/it (If I was rich...), nhưng “were” chuẩn hơn, nhất là trong văn viết và bài thi.",
          "“If I were you, I would/wouldn't + V” là cách đưa lời khuyên rất phổ biến. Cụm này hầu như luôn dùng “were”.",
        ],
        examples: [
          { en: "If I were you, I would apologise to her.", vi: "Nếu tôi là bạn, tôi sẽ xin lỗi cô ấy." },
          { en: "If I were you, I wouldn't buy that phone.", vi: "Nếu tôi là bạn, tôi sẽ không mua cái điện thoại đó." },
          { en: "If she were here, she would know what to do.", vi: "Nếu cô ấy ở đây, cô ấy sẽ biết phải làm gì." },
        ],
      },
      {
        heading: "Thêm ví dụ",
        examples: [
          { en: "If I knew her number, I would call her.", vi: "Nếu tôi biết số điện thoại của cô ấy, tôi sẽ gọi cho cô ấy.", note: "Thực tế: tôi không biết số." },
          { en: "If we didn't have so much homework, we could go out.", vi: "Nếu chúng mình không có nhiều bài tập thế này thì đã có thể đi chơi." },
          { en: "What would you do if you won the lottery?", vi: "Bạn sẽ làm gì nếu trúng xổ số?" },
          { en: "He might get the job if he spoke English better.", vi: "Có lẽ anh ấy sẽ được nhận nếu nói tiếng Anh tốt hơn." },
        ],
      },
      {
        heading: "So sánh loại 1 và loại 2",
        table: {
          head: ["", "Loại 1", "Loại 2"],
          rows: [
            ["Công thức", "If + hiện tại đơn, will + V", "If + quá khứ đơn, would + V"],
            ["Tình huống", "Có thể xảy ra, thực tế", "Không có thật / khó xảy ra, tưởng tượng"],
            ["Ví dụ", "If I have time tomorrow, I'll help you. (có thể tôi sẽ rảnh)", "If I had time, I'd help you. (nhưng thực tế tôi không có thời gian)"],
            ["Ví dụ", "If I find your keys, I'll tell you.", "If I found a wallet in the street, I'd take it to the police."],
          ],
        },
        points: [
          "Cùng một tình huống, người nói chọn loại 1 nếu thấy có khả năng xảy ra, chọn loại 2 nếu thấy khó xảy ra hoặc chỉ là tưởng tượng.",
        ],
      },
    ],
    mistakes: [
      { wrong: "If I would have more time, I would learn Japanese.", right: "If I had more time, I would learn Japanese.", why: "Không dùng “would” trong mệnh đề if; mệnh đề if dùng quá khứ đơn." },
      { wrong: "If I am you, I would apologise.", right: "If I were you, I would apologise.", why: "Tình huống không có thật (tôi không thể là bạn) → dùng “were”." },
      { wrong: "If I had a car, I will drive to work.", right: "If I had a car, I would drive to work.", why: "Loại 2: mệnh đề chính dùng would + V, không dùng will." },
      { wrong: "If she knows the answer, she would tell us.", right: "If she knew the answer, she would tell us.", why: "Mệnh đề chính có “would” → mệnh đề if phải ở quá khứ đơn (knew); không trộn lẫn loại 1 và loại 2." },
      { wrong: "If I were you, I wouldn't to buy it.", right: "If I were you, I wouldn't buy it.", why: "Sau would/wouldn't là động từ nguyên mẫu không “to”." },
    ],
    exercises: [
      {
        kind: "choice",
        question: "If I ___ you, I would talk to the teacher.",
        options: ["am", "were", "will be", "be"],
        answer: 1,
        explain: "Lời khuyên “If I were you” – tình huống không có thật nên dùng “were”.",
      },
      {
        kind: "choice",
        question: "If we had more money, we ___ a bigger house.",
        options: ["will buy", "bought", "buy", "would buy"],
        answer: 3,
        explain: "Mệnh đề if ở quá khứ đơn (had) → loại 2, mệnh đề chính dùng would + V: would buy.",
      },
      {
        kind: "fill",
        question: "If he ___ closer, he would visit us more often.",
        hint: "live",
        answers: ["lived"],
        explain: "Loại 2 (thực tế anh ấy sống xa): mệnh đề if dùng quá khứ đơn → lived.",
      },
      {
        kind: "choice",
        question: "What would you do if you ___ a snake in your bedroom?",
        options: ["find", "will find", "found", "would find"],
        answer: 2,
        explain: "Câu hỏi giả định với “would” → mệnh đề if dùng quá khứ đơn “found”. Không dùng will/would trong mệnh đề if.",
      },
      {
        kind: "choice",
        question: "I don't have a car. If I ___ one, I could drive you home.",
        options: ["had", "have", "would have", "will have"],
        answer: 0,
        explain: "Thực tế không có xe → giả định trái hiện tại, loại 2: If + quá khứ đơn “had”.",
      },
      {
        kind: "fill",
        question: "She ___ so tired if she went to bed earlier.",
        hint: "not / be",
        answers: ["wouldn't be", "would not be"],
        explain: "Mệnh đề if ở quá khứ đơn (went) → mệnh đề chính dùng would + V; phủ định: wouldn't be.",
      },
      {
        kind: "choice",
        question: "I'm sure I'll see Nam tomorrow. If I ___ him, I'll give him your message.",
        options: ["saw", "see", "would see", "had seen"],
        answer: 1,
        explain: "Người nói chắc chắn sẽ gặp Nam, mệnh đề chính có “I'll” → câu điều kiện loại 1: If + hiện tại đơn “see”.",
      },
      {
        kind: "fill",
        question: "If I ___ taller, I would play basketball.",
        hint: "be",
        answers: ["were", "was"],
        explain: "Loại 2 với động từ “be”: “were” là dạng chuẩn cho mọi ngôi; “was” cũng được chấp nhận trong văn nói thân mật.",
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // 7. Defining relative clauses
  // ---------------------------------------------------------------------------
  {
    id: "b1-relative-clauses",
    level: "B1",
    title: "Mệnh đề quan hệ xác định",
    titleEn: "Defining relative clauses",
    summary:
      "Dùng who, which, that, whose, where, when để nối thêm thông tin xác định cho danh từ (người nào, vật nào, nơi nào), và biết khi nào được lược bỏ đại từ quan hệ.",
    sections: [
      {
        heading: "Mệnh đề quan hệ xác định là gì?",
        text: "Mệnh đề quan hệ xác định đứng ngay sau một danh từ để cho biết ta đang nói đến người/vật nào. Nếu bỏ nó đi, câu sẽ thiếu thông tin quan trọng. Loại mệnh đề này KHÔNG có dấu phẩy.",
        examples: [
          { en: "The woman who lives next door is a doctor.", vi: "Người phụ nữ sống cạnh nhà tôi là bác sĩ.", note: "“who lives next door” cho biết là người phụ nữ nào." },
          { en: "I've lost the book which you lent me.", vi: "Tôi làm mất cuốn sách mà bạn cho tôi mượn rồi." },
        ],
      },
      {
        heading: "Các đại từ và trạng từ quan hệ",
        table: {
          head: ["Từ", "Thay cho", "Ví dụ"],
          rows: [
            ["who", "người", "The man who called you is my uncle."],
            ["which", "vật, con vật", "The bike which I bought last week is red."],
            ["that", "người hoặc vật (thay được who/which trong mệnh đề xác định)", "The car that he drives is very old."],
            ["whose", "sở hữu: “mà ... của người/vật đó” (whose + danh từ)", "The girl whose bike was stolen is crying."],
            ["where", "nơi chốn (= in/at which)", "This is the hotel where we stayed."],
            ["when", "thời gian (= on/in which)", "I remember the day when we met."],
          ],
        },
        points: [
          "“whom” thay cho người khi làm tân ngữ, mang tính trang trọng: the man whom I met. Trong văn nói thường dùng who/that hoặc lược bỏ.",
        ],
      },
      {
        heading: "Công thức",
        formulas: [
          { label: "Làm chủ ngữ", pattern: "N + who/which/that + V..." },
          { label: "Làm tân ngữ", pattern: "N + (who/which/that) + S + V..." },
          { label: "Sở hữu", pattern: "N + whose + N + V..." },
          { label: "Nơi chốn", pattern: "N (nơi chốn) + where + S + V..." },
          { label: "Thời gian", pattern: "N (thời gian) + when + S + V..." },
        ],
        examples: [
          { en: "People who exercise regularly usually sleep better.", vi: "Những người tập thể dục đều đặn thường ngủ ngon hơn.", note: "who làm chủ ngữ của “exercise”." },
          { en: "The film (that) we watched last night was boring.", vi: "Bộ phim chúng tôi xem tối qua chán lắm.", note: "that làm tân ngữ của “watched” → có thể bỏ." },
          { en: "I have a friend whose father is a pilot.", vi: "Tôi có một người bạn có bố là phi công." },
          { en: "This is the village where my grandparents live.", vi: "Đây là ngôi làng nơi ông bà tôi sống." },
          { en: "Do you remember the year when we started school?", vi: "Bạn có nhớ năm chúng ta bắt đầu đi học không?" },
        ],
      },
      {
        heading: "Lược bỏ đại từ quan hệ",
        points: [
          "Được bỏ who/which/that khi nó làm TÂN NGỮ, tức là ngay sau nó là một chủ ngữ mới + động từ: The phone (that) I bought is broken.",
          "KHÔNG được bỏ khi nó làm CHỦ NGỮ, tức là ngay sau nó là động từ: The man who lives here... (không nói: The man lives here is...).",
          "Không bao giờ bỏ “whose”.",
          "Sau danh từ chỉ thời gian, “when” thường có thể thay bằng “that” hoặc lược bỏ: the day (when/that) we met.",
        ],
        examples: [
          { en: "The people we met on holiday were very friendly.", vi: "Những người chúng tôi gặp trong kỳ nghỉ rất thân thiện.", note: "= The people (who/that) we met..." },
        ],
      },
      {
        heading: "Lưu ý: where hay which?",
        points: [
          "Dùng “where” khi mệnh đề sau nó đã đủ thành phần (S + V, không thiếu tân ngữ): This is the town where I was born.",
          "Dùng “which/that” (hoặc bỏ) khi động từ phía sau còn thiếu tân ngữ: This is the town (which/that) I visited last year. (visit cần tân ngữ → town).",
          "Có thể dùng giới từ: the house where I live = the house (which/that) I live in = the house in which I live (trang trọng).",
          "Không lặp lại tân ngữ trong mệnh đề quan hệ: The book which I bought yesterday... (không thêm “it” sau bought, vì “which” đã thay cho “the book”).",
        ],
      },
    ],
    mistakes: [
      { wrong: "The man which lives next door is a teacher.", right: "The man who lives next door is a teacher.", why: "Danh từ chỉ người dùng who (hoặc that), không dùng which." },
      { wrong: "The book that I bought it yesterday is great.", right: "The book that I bought yesterday is great.", why: "“that” đã thay cho “the book” nên không lặp lại “it”." },
      { wrong: "This is the city where I visited last year.", right: "This is the city (that/which) I visited last year.", why: "“visit” cần tân ngữ; “where” không làm tân ngữ được nên phải dùng which/that hoặc bỏ đại từ." },
      { wrong: "I have a friend who his father is a pilot.", right: "I have a friend whose father is a pilot.", why: "Chỉ sự sở hữu (bố của bạn ấy) → dùng whose + danh từ." },
      { wrong: "The girl is talking to Tom is my sister.", right: "The girl who is talking to Tom is my sister.", why: "Đại từ quan hệ làm chủ ngữ (trước động từ “is talking”) thì không được lược bỏ." },
    ],
    exercises: [
      {
        kind: "choice",
        question: "The woman ___ lives next door is a nurse.",
        options: ["which", "who", "whose", "where"],
        answer: 1,
        explain: "Danh từ chỉ người (the woman), đại từ làm chủ ngữ của “lives” → who.",
      },
      {
        kind: "choice",
        question: "I have a friend ___ mother is a famous singer.",
        options: ["who", "that", "whose", "which"],
        answer: 2,
        explain: "Mẹ CỦA người bạn → quan hệ sở hữu, sau chỗ trống là danh từ (mother) → whose.",
      },
      {
        kind: "fill",
        question: "A man ___ car had broken down asked us for help.",
        hint: "who / which / whose / where / when",
        answers: ["whose"],
        explain: "Chiếc xe CỦA người đàn ông → whose + danh từ (car).",
      },
      {
        kind: "choice",
        question: "This is the restaurant ___ we had our first date.",
        options: ["which", "who", "whose", "where"],
        answer: 3,
        explain: "Nơi chốn, và mệnh đề sau đã đủ thành phần (we had our first date) → where. Muốn dùng “which” thì phải có giới từ: in which.",
      },
      {
        kind: "choice",
        question: "The film ___ we watched last night was really boring.",
        options: ["which", "who", "where", "whose"],
        answer: 0,
        explain: "Danh từ chỉ vật (the film), làm tân ngữ của “watched” → which (cũng có thể dùng that hoặc lược bỏ). “where” sai vì “watch” còn thiếu tân ngữ.",
      },
      {
        kind: "fill",
        question: "The students ___ passed the exam will get a certificate.",
        hint: "who / which / whose / where / when",
        answers: ["who", "that"],
        explain: "Danh từ chỉ người, đại từ làm chủ ngữ của “passed” → who hoặc that (không được lược bỏ).",
      },
      {
        kind: "choice",
        question: "Câu nào lược bỏ đại từ quan hệ ĐÚNG?",
        options: [
          "The man lives next door is very friendly.",
          "The phone I bought last week is already broken.",
          "The girl won the prize is my cousin.",
          "The boy father is a doctor is my classmate.",
        ],
        answer: 1,
        explain: "Chỉ được bỏ đại từ quan hệ khi nó làm tân ngữ: The phone (that) I bought... Các câu còn lại bỏ đại từ làm chủ ngữ (who lives, who won) hoặc bỏ “whose” → sai.",
      },
      {
        kind: "fill",
        question: "Do you remember the day ___ we first met?",
        hint: "who / which / whose / where / when",
        answers: ["when", "that", "on which"],
        explain: "Danh từ chỉ thời gian (the day) → when. Cũng có thể dùng “that” hoặc bỏ hẳn: the day we first met.",
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // 8. Reported speech
  // ---------------------------------------------------------------------------
  {
    id: "b1-reported-speech",
    level: "B1",
    title: "Câu tường thuật",
    titleEn: "Reported speech",
    summary:
      "Thuật lại lời người khác: lùi thì, đổi đại từ và trạng từ thời gian/nơi chốn, tường thuật câu hỏi và câu mệnh lệnh, phân biệt say và tell.",
    sections: [
      {
        heading: "Câu tường thuật là gì?",
        text: "Câu trực tiếp trích nguyên văn lời nói (trong ngoặc kép). Câu tường thuật (gián tiếp) kể lại ý của lời nói đó, không dùng ngoặc kép. Khi động từ tường thuật ở quá khứ (said, told, asked), động từ trong lời thuật thường được lùi về quá khứ một bậc.",
        examples: [
          { en: "“I'm tired,” Lan said. → Lan said (that) she was tired.", vi: "“Mình mệt quá,” Lan nói. → Lan nói rằng cô ấy mệt.", note: "“that” có thể bỏ." },
        ],
      },
      {
        heading: "Bảng lùi thì",
        table: {
          head: ["Câu trực tiếp", "Câu tường thuật", "Ví dụ"],
          rows: [
            ["Hiện tại đơn", "Quá khứ đơn", "“I live in Hue.” → He said he lived in Hue."],
            ["Hiện tại tiếp diễn", "Quá khứ tiếp diễn", "“I'm working.” → She said she was working."],
            ["Hiện tại hoàn thành", "Quá khứ hoàn thành", "“I've finished.” → He said he had finished."],
            ["Quá khứ đơn", "Quá khứ hoàn thành (hoặc giữ nguyên)", "“I saw it.” → She said she had seen it."],
            ["will", "would", "“I'll help you.” → He said he would help me."],
            ["can", "could", "“I can swim.” → She said she could swim."],
            ["may", "might", "“I may be late.” → He said he might be late."],
            ["must", "had to (hoặc giữ must)", "“I must go.” → She said she had to go."],
            ["am/is/are going to", "was/were going to", "“We're going to move.” → They said they were going to move."],
          ],
        },
        points: [
          "Không bắt buộc lùi thì khi động từ tường thuật ở hiện tại: He says he is tired.",
          "Không bắt buộc lùi thì khi điều được nói vẫn còn đúng ở thời điểm thuật lại: She said she lives in Hanoi (cô ấy vẫn sống ở Hà Nội). Lùi thì trong trường hợp này vẫn đúng.",
          "could, would, should, might, ought to thường giữ nguyên.",
        ],
      },
      {
        heading: "Đổi đại từ, trạng từ thời gian và nơi chốn",
        table: {
          head: ["Câu trực tiếp", "Câu tường thuật"],
          rows: [
            ["now", "then / at that time"],
            ["today", "that day"],
            ["tonight", "that night"],
            ["yesterday", "the day before / the previous day"],
            ["tomorrow", "the next day / the following day"],
            ["last week", "the week before / the previous week"],
            ["next week", "the following week / the week after"],
            ["... ago", "... before"],
            ["here", "there"],
            ["this / these", "that / those"],
          ],
        },
        points: [
          "Đại từ đổi theo người nói và người nghe: “I love you,” he said to her. → He told her (that) he loved her.",
          "Chỉ đổi trạng từ khi thời gian/nơi chốn đã thay đổi. Nếu thuật lại ngay trong ngày, “today” có thể giữ nguyên.",
        ],
      },
      {
        heading: "Tường thuật câu hỏi",
        formulas: [
          { label: "Câu hỏi Yes/No", pattern: "S + asked (+ O) + if/whether + S + V (lùi thì)" },
          { label: "Câu hỏi Wh-", pattern: "S + asked (+ O) + Wh- + S + V (lùi thì)" },
        ],
        points: [
          "Câu hỏi tường thuật có trật tự như câu khẳng định (S + V), KHÔNG đảo trợ động từ, KHÔNG dùng do/does/did, KHÔNG có dấu chấm hỏi.",
        ],
        examples: [
          { en: "“Are you hungry?” → She asked me if I was hungry.", vi: "“Con có đói không?” → Bà hỏi tôi có đói không." },
          { en: "“Do you like coffee?” → He asked whether I liked coffee.", vi: "“Bạn có thích cà phê không?” → Anh ấy hỏi tôi có thích cà phê không." },
          { en: "“Where do you live?” → He asked me where I lived.", vi: "“Bạn sống ở đâu?” → Anh ấy hỏi tôi sống ở đâu." },
          { en: "“What time will the train leave?” → She asked what time the train would leave.", vi: "“Mấy giờ tàu chạy?” → Cô ấy hỏi mấy giờ tàu sẽ chạy." },
        ],
      },
      {
        heading: "Câu mệnh lệnh, yêu cầu",
        formulas: [
          { label: "Khẳng định", pattern: "S + told/asked + O + to V" },
          { label: "Phủ định", pattern: "S + told/asked + O + not to V" },
        ],
        examples: [
          { en: "“Close the door.” → He told me to close the door.", vi: "“Đóng cửa lại.” → Anh ấy bảo tôi đóng cửa." },
          { en: "“Please don't shout.” → She asked us not to shout.", vi: "“Làm ơn đừng la hét.” → Cô ấy đề nghị chúng tôi đừng la hét." },
        ],
        points: [
          "told = ra lệnh, bảo; asked = đề nghị, nhờ (lịch sự hơn).",
        ],
      },
      {
        heading: "say và tell",
        table: {
          head: ["", "say", "tell"],
          rows: [
            ["Cấu trúc", "say (that) + mệnh đề / say something to sb", "tell + sb (+ that) + mệnh đề / tell sb to V"],
            ["Có người nghe ngay sau?", "Không: say me ✘", "Bắt buộc: tell me ✔"],
            ["Ví dụ", "She said (that) she was busy. / She said to me that...", "She told me (that) she was busy."],
          ],
        },
        points: [
          "Một số cụm cố định với tell không cần người nghe: tell the truth, tell a lie, tell a story, tell a joke.",
        ],
        examples: [
          { en: "He said (that) he would call me later.", vi: "Anh ấy nói (rằng) anh ấy sẽ gọi cho tôi sau." },
          { en: "He told me (that) he would call me later.", vi: "Anh ấy bảo tôi là anh ấy sẽ gọi cho tôi sau." },
        ],
      },
    ],
    mistakes: [
      { wrong: "She said me that she was tired.", right: "She told me that she was tired.", why: "“say” không đi trực tiếp với người nghe; dùng “tell + người” hoặc “said to me”." },
      { wrong: "He asked me where did I live.", right: "He asked me where I lived.", why: "Câu hỏi tường thuật dùng trật tự S + V, không dùng “did” và không đảo ngữ." },
      { wrong: "She asked me do I like coffee.", right: "She asked me if I liked coffee.", why: "Câu hỏi Yes/No được tường thuật bằng if/whether + S + V (lùi thì)." },
      { wrong: "He told me don't be late.", right: "He told me not to be late.", why: "Mệnh lệnh phủ định tường thuật bằng tell + O + not to V." },
      { wrong: "Last week she said, “I'll come tomorrow.” → She said she will come tomorrow.", right: "She said she would come the next day.", why: "Thuật lại vào một thời điểm khác: will → would, tomorrow → the next day." },
    ],
    exercises: [
      {
        kind: "choice",
        question: "“I'm watching TV,” Mai said. → Mai said she ___ TV.",
        options: ["was watching", "watching", "watched", "has watched"],
        answer: 0,
        explain: "Hiện tại tiếp diễn lùi thành quá khứ tiếp diễn: am watching → was watching.",
      },
      {
        kind: "choice",
        question: "He asked me where ___.",
        options: ["did I live", "do I live", "I lived", "I did live"],
        answer: 2,
        explain: "Câu hỏi Wh- tường thuật dùng trật tự câu khẳng định: where + S + V → where I lived.",
      },
      {
        kind: "choice",
        question: "She ___ me that she would be late.",
        options: ["said", "spoke", "asked", "told"],
        answer: 3,
        explain: "Có người nghe ngay sau động từ (me) và theo sau là mệnh đề “that...” → told. “said me” sai; “asked” dùng cho câu hỏi/yêu cầu.",
      },
      {
        kind: "fill",
        question: "“Please open the window,” she said to me. → She asked me ___ the window.",
        hint: "open",
        answers: ["to open"],
        explain: "Lời đề nghị tường thuật bằng ask + O + to V → asked me to open.",
      },
      {
        kind: "choice",
        question: "The teacher told us ___ in class.",
        options: ["don't talk", "not to talk", "not talk", "to not talking"],
        answer: 1,
        explain: "Mệnh lệnh phủ định tường thuật: tell + O + not to V → told us not to talk.",
      },
      {
        kind: "fill",
        question: "“Where are you going?” he asked me. → He asked me where I ___.",
        hint: "go",
        answers: ["was going"],
        explain: "Hiện tại tiếp diễn (are going) lùi thành quá khứ tiếp diễn; chủ ngữ “I” → was going. Trật tự S + V, không đảo ngữ.",
      },
      {
        kind: "choice",
        question: "“Do you like spicy food?” → She asked me ___ spicy food.",
        options: ["that I liked", "do I like", "whether did I like", "if I liked"],
        answer: 3,
        explain: "Câu hỏi Yes/No tường thuật: if/whether + S + V (lùi thì) → if I liked. Không dùng “that” và không đảo ngữ.",
      },
      {
        kind: "fill",
        question: "“I'll call you tomorrow,” Nam said last week. → Nam said he would call me the ___ day.",
        hint: "tomorrow",
        answers: ["next", "following"],
        explain: "Thuật lại ở thời điểm khác nên “tomorrow” đổi thành “the next day” hoặc “the following day”.",
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // 9. used to / would / be used to / get used to
  // ---------------------------------------------------------------------------
  {
    id: "b1-used-to",
    level: "B1",
    title: "used to, would và be/get used to",
    titleEn: "used to, would, be used to, get used to",
    summary:
      "Dùng used to và would để nói về thói quen trong quá khứ nay không còn; phân biệt với be used to / get used to + V-ing/N (quen với, dần quen với).",
    sections: [
      {
        heading: "used to + V: thói quen, trạng thái trong quá khứ",
        text: "“used to + V” diễn tả việc thường xảy ra hoặc một trạng thái kéo dài trong quá khứ, nhưng bây giờ KHÔNG còn nữa. Không có dạng hiện tại tương ứng (nói về thói quen hiện tại thì dùng hiện tại đơn).",
        examples: [
          { en: "I used to play football every day after school.", vi: "Hồi xưa ngày nào tan học tôi cũng đá bóng.", note: "Bây giờ không còn đá nữa." },
          { en: "She used to have long hair.", vi: "Trước đây cô ấy để tóc dài.", note: "Trạng thái trong quá khứ." },
          { en: "There used to be a cinema here.", vi: "Trước đây ở đây từng có một rạp chiếu phim." },
        ],
      },
      {
        heading: "Công thức",
        formulas: [
          { label: "Khẳng định", pattern: "S + used to + V" },
          { label: "Phủ định", pattern: "S + didn't use to + V" },
          { label: "Nghi vấn", pattern: "Did + S + use to + V?" },
        ],
        points: [
          "Sau did/didn't dùng “use to” (không có “d”), vì did đã mang dấu hiệu quá khứ: Did you use to...? / I didn't use to...",
          "Cũng có thể nói “never used to”: I never used to like vegetables.",
          "Với hành động xảy ra một lần hoặc có số lần cụ thể → dùng quá khứ đơn, không dùng used to: I went to Japan three times.",
        ],
        examples: [
          { en: "I didn't use to like vegetables, but now I love them.", vi: "Trước đây tôi không thích rau, nhưng giờ thì rất thích." },
          { en: "Did you use to live in the countryside?", vi: "Trước đây bạn từng sống ở quê à?" },
        ],
      },
      {
        heading: "would + V: hành động lặp lại trong quá khứ",
        points: [
          "“would + V” cũng diễn tả hành động lặp đi lặp lại trong quá khứ, thường dùng khi kể chuyện, hồi tưởng, và khi thời điểm quá khứ đã được nêu rõ.",
          "“would” CHỈ dùng cho hành động, KHÔNG dùng cho trạng thái (be, have, live, like, know...). Với trạng thái phải dùng used to.",
        ],
        examples: [
          { en: "When I was a child, my grandmother would tell me stories every night.", vi: "Hồi nhỏ, tối nào bà cũng kể chuyện cho tôi nghe." },
          { en: "When I was young, I used to have a dog.", vi: "Hồi nhỏ tôi từng nuôi một con chó.", note: "“have” chỉ trạng thái → không dùng would." },
        ],
      },
      {
        heading: "be used to / get used to + V-ing / N",
        text: "Đây là cấu trúc hoàn toàn khác. “used” ở đây là tính từ nghĩa là “quen”, và “to” là giới từ nên theo sau là V-ing hoặc danh từ.",
        formulas: [
          { label: "Đã quen với", pattern: "S + be + used to + V-ing / N" },
          { label: "Dần quen với", pattern: "S + get + used to + V-ing / N" },
        ],
        points: [
          "be/get được chia ở mọi thì: I'm used to..., I wasn't used to..., You'll get used to..., She's getting used to...",
        ],
        examples: [
          { en: "I'm used to getting up early.", vi: "Tôi quen dậy sớm rồi." },
          { en: "She's getting used to living alone.", vi: "Cô ấy đang dần quen với việc sống một mình." },
          { en: "It took me a long time to get used to the noise.", vi: "Tôi mất một thời gian dài mới quen được với tiếng ồn." },
          { en: "He wasn't used to the cold weather.", vi: "Anh ấy chưa quen với thời tiết lạnh." },
        ],
      },
      {
        heading: "Bảng so sánh",
        table: {
          head: ["Cấu trúc", "Theo sau là", "Nghĩa", "Ví dụ"],
          rows: [
            ["used to", "V (nguyên mẫu)", "Thói quen/trạng thái trong quá khứ, nay không còn", "I used to smoke."],
            ["would", "V (nguyên mẫu)", "Hành động lặp lại trong quá khứ (không dùng cho trạng thái)", "We would play in the fields."],
            ["be used to", "V-ing / N", "Đã quen với", "I'm used to working at night."],
            ["get used to", "V-ing / N", "Dần quen với", "You'll get used to working at night."],
          ],
        },
      },
    ],
    mistakes: [
      { wrong: "I use to play the guitar when I was young.", right: "I used to play the guitar when I was young.", why: "Ở câu khẳng định phải là “used to” (có “d”)." },
      { wrong: "Did you used to live here?", right: "Did you use to live here?", why: "Sau “did” dùng “use to”, không có “d”." },
      { wrong: "I am used to get up early.", right: "I am used to getting up early.", why: "Trong “be used to”, “to” là giới từ nên theo sau là V-ing." },
      { wrong: "When I was young, I would have a dog.", right: "When I was young, I used to have a dog.", why: "“would” không dùng cho trạng thái (have = sở hữu); phải dùng used to." },
      { wrong: "I used to go to Paris three times.", right: "I went to Paris three times.", why: "Có số lần cụ thể → dùng quá khứ đơn, không dùng used to." },
    ],
    exercises: [
      {
        kind: "choice",
        question: "I ___ like vegetables, but now I love them.",
        options: ["didn't use to", "wasn't used to", "am not used to", "don't use to"],
        answer: 0,
        explain: "Trạng thái trong quá khứ nay đã thay đổi → didn't use to + V. “wasn't used to” phải đi với V-ing/N.",
      },
      {
        kind: "choice",
        question: "She has lived in London for years, so she ___ driving on the left.",
        options: ["used to", "is used to", "uses to", "would"],
        answer: 1,
        explain: "Sau chỗ trống là V-ing (driving) và nghĩa là “đã quen với” → is used to.",
      },
      {
        kind: "fill",
        question: "My grandfather ___ a lot, but he gave up ten years ago.",
        hint: "use to / smoke",
        answers: ["used to smoke"],
        explain: "Thói quen trong quá khứ nay không còn → used to + V.",
      },
      {
        kind: "choice",
        question: "When we were kids, we ___ climb trees in the park every weekend.",
        options: ["were used to", "use", "would", "are used to"],
        answer: 2,
        explain: "Hành động lặp lại trong quá khứ, theo sau là V nguyên mẫu (climb) → would. “were used to” phải đi với V-ing.",
      },
      {
        kind: "fill",
        question: "I'm not used to ___ at night.",
        hint: "work",
        answers: ["working"],
        explain: "be used to + V-ing → working.",
      },
      {
        kind: "choice",
        question: "It was hard at first, but I'm slowly ___ to the cold weather.",
        options: ["using", "getting used", "used", "use"],
        answer: 1,
        explain: "“dần dần quen” → get used to; ở dạng tiếp diễn: I'm getting used to the cold weather.",
      },
      {
        kind: "choice",
        question: "___ you use to have long hair?",
        options: ["Were", "Do", "Are", "Did"],
        answer: 3,
        explain: "Câu hỏi với used to: Did + S + use to + V?",
      },
      {
        kind: "fill",
        question: "We ___ have a TV when I was young.",
        hint: "not / use to",
        answers: ["didn't use to", "did not use to"],
        explain: "Phủ định của used to: didn't use to + V (sau did dùng “use”, không có “d”).",
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // 10. Question tags
  // ---------------------------------------------------------------------------
  {
    id: "b1-question-tags",
    level: "B1",
    title: "Câu hỏi đuôi",
    titleEn: "Question tags",
    summary:
      "Câu hỏi đuôi là phần hỏi ngắn ở cuối câu để xác nhận thông tin hoặc mong người nghe đồng ý. Học quy tắc chung, các trường hợp đặc biệt, ngữ điệu và cách trả lời.",
    sections: [
      {
        heading: "Câu hỏi đuôi là gì?",
        text: "Câu hỏi đuôi được thêm vào cuối câu trần thuật, giống “..., phải không?”, “..., đúng không?” trong tiếng Việt.",
        examples: [
          { en: "You're a student, aren't you?", vi: "Bạn là sinh viên, phải không?" },
          { en: "It isn't very cold today, is it?", vi: "Hôm nay trời không lạnh lắm, nhỉ?" },
        ],
      },
      {
        heading: "Quy tắc chung",
        formulas: [
          { label: "Câu khẳng định", pattern: "S + V..., trợ động từ + n't + đại từ?" },
          { label: "Câu phủ định", pattern: "S + trợ động từ + not + V..., trợ động từ + đại từ?" },
        ],
        points: [
          "Câu chính khẳng định → đuôi phủ định; câu chính phủ định → đuôi khẳng định.",
          "Đuôi dùng lại be / trợ động từ / modal của câu chính. Nếu câu chính không có (hiện tại đơn, quá khứ đơn) thì dùng do/does/did.",
          "Chủ ngữ ở đuôi luôn là đại từ: Tom → he, Lan → she, this/that → it, these/those → they.",
          "Đuôi phủ định luôn dùng dạng rút gọn: isn't, don't, didn't, can't...",
        ],
        examples: [
          { en: "Your brother lives in Da Nang, doesn't he?", vi: "Anh trai bạn sống ở Đà Nẵng, phải không?" },
          { en: "They went home early, didn't they?", vi: "Họ về nhà sớm, đúng không?" },
          { en: "You've finished your homework, haven't you?", vi: "Con làm xong bài tập rồi, phải không?" },
          { en: "She can speak French, can't she?", vi: "Cô ấy nói được tiếng Pháp, phải không?" },
          { en: "It won't rain tomorrow, will it?", vi: "Mai trời sẽ không mưa, đúng không?" },
        ],
      },
      {
        heading: "Các trường hợp đặc biệt",
        table: {
          head: ["Trường hợp", "Đuôi", "Ví dụ"],
          rows: [
            ["I am", "aren't I", "I'm late, aren't I?"],
            ["Let's", "shall we", "Let's go to the beach, shall we?"],
            ["Câu mệnh lệnh", "will you (cũng gặp: won't you, can you, could you)", "Open the door, will you? / Don't be late, will you?"],
            ["never, nobody, nothing, no one, hardly, rarely, seldom", "đuôi khẳng định", "She never cooks, does she?"],
            ["nobody, no one, everyone, somebody...", "dùng “they”", "Nobody called, did they?"],
            ["nothing, everything", "dùng “it”", "Nothing happened, did it?"],
            ["There is / There are", "isn't there / aren't there", "There's a problem, isn't there?"],
          ],
        },
        points: [
          "Các từ never, nobody, hardly... làm câu mang nghĩa phủ định dù không có “not” → đuôi phải ở dạng khẳng định.",
          "“have” nghĩa là “có/sở hữu” thường dùng đuôi với do: You have a car, don't you? (đuôi “haven't you” ít gặp, chủ yếu trong tiếng Anh-Anh).",
        ],
      },
      {
        heading: "Ngữ điệu",
        points: [
          "Lên giọng ở đuôi (↗): người nói không chắc, thật sự muốn hỏi. You're coming tomorrow, aren't you? ↗",
          "Xuống giọng ở đuôi (↘): người nói khá chắc, chỉ muốn người nghe xác nhận hoặc đồng ý. It's a beautiful day, isn't it? ↘",
        ],
      },
      {
        heading: "Cách trả lời",
        text: "Trả lời theo SỰ THẬT, không theo hình thức của câu hỏi. Đây là chỗ người Việt hay nhầm vì trong tiếng Việt ta thường trả lời “Ừ/Đúng” để đồng ý với người hỏi.",
        examples: [
          { en: "You don't smoke, do you? – No, I don't.", vi: "Bạn không hút thuốc, phải không? – Ừ, mình không hút.", note: "Thực tế không hút → No." },
          { en: "You don't smoke, do you? – Yes, I do.", vi: "Bạn không hút thuốc, phải không? – Có chứ, mình có hút.", note: "Thực tế có hút → Yes." },
        ],
      },
    ],
    mistakes: [
      { wrong: "You are a teacher, isn't it?", right: "You are a teacher, aren't you?", why: "Đuôi phải dùng lại động từ và đại từ của câu chính (are ... you), không dùng “isn't it” cho mọi câu." },
      { wrong: "I'm right, am not I?", right: "I'm right, aren't I?", why: "Đuôi của “I am” là “aren't I”." },
      { wrong: "She never eats meat, doesn't she?", right: "She never eats meat, does she?", why: "“never” làm câu mang nghĩa phủ định → đuôi khẳng định." },
      { wrong: "He went to the party, doesn't he?", right: "He went to the party, didn't he?", why: "Câu chính ở quá khứ đơn → đuôi dùng “did”." },
      { wrong: "Let's go out, don't we?", right: "Let's go out, shall we?", why: "Câu bắt đầu bằng “Let's” có đuôi “shall we”." },
    ],
    exercises: [
      {
        kind: "choice",
        question: "Your sister lives in Da Nang, ___?",
        options: ["isn't she", "doesn't she", "didn't she", "does she"],
        answer: 1,
        explain: "Câu khẳng định ở hiện tại đơn (lives) → đuôi phủ định với does: doesn't she?",
      },
      {
        kind: "choice",
        question: "I'm late again, ___?",
        options: ["am not I", "isn't I", "aren't I", "don't I"],
        answer: 2,
        explain: "Trường hợp đặc biệt: “I am” → đuôi “aren't I”.",
      },
      {
        kind: "fill",
        question: "You can't swim, ___?",
        answers: ["can you"],
        explain: "Câu phủ định với “can't” → đuôi khẳng định “can you”.",
      },
      {
        kind: "choice",
        question: "Nobody called while I was out, ___?",
        options: ["didn't they", "did they", "was it", "wasn't it"],
        answer: 1,
        explain: "“Nobody” mang nghĩa phủ định → đuôi khẳng định; quá khứ đơn (called) → did; nobody dùng đại từ “they” → did they?",
      },
      {
        kind: "choice",
        question: "Let's have a break, ___?",
        options: ["shall we", "don't we", "will we", "won't you"],
        answer: 0,
        explain: "Câu bắt đầu bằng “Let's” → đuôi “shall we”.",
      },
      {
        kind: "fill",
        question: "Tom and Linh were at the meeting, ___?",
        answers: ["weren't they", "were they not"],
        explain: "Câu khẳng định với “were”, chủ ngữ số nhiều → đuôi phủ định “weren't they”.",
      },
      {
        kind: "choice",
        question: "They have never been to Hue, ___?",
        options: ["haven't they", "don't they", "did they", "have they"],
        answer: 3,
        explain: "“never” làm câu mang nghĩa phủ định → đuôi khẳng định; trợ động từ là “have” → have they?",
      },
      {
        kind: "fill",
        question: "There's some milk in the fridge, ___?",
        answers: ["isn't there", "is there not"],
        explain: "Câu “There is” khẳng định → đuôi “isn't there” (dùng lại “there”, không dùng “it”).",
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // 11. Modals of deduction (present)
  // ---------------------------------------------------------------------------
  {
    id: "b1-modals-deduction",
    level: "B1",
    title: "Phỏng đoán ở hiện tại với must, might, can't",
    titleEn: "Modals of deduction (present)",
    summary:
      "Dùng must, may, might, could, can't để đoán mức độ chắc chắn của một sự việc ở hiện tại dựa trên những gì ta biết hoặc nhìn thấy.",
    sections: [
      {
        heading: "Phỏng đoán là gì?",
        text: "Khi không biết chắc chắn nhưng có bằng chứng hoặc lý do, ta dùng động từ khuyết thiếu để nói mình chắc chắn đến mức nào. Trong cách dùng này, must và can't KHÔNG mang nghĩa “phải” hay “không được”.",
        examples: [
          { en: "She's been working all day. She must be tired.", vi: "Cô ấy làm việc cả ngày rồi. Chắc hẳn cô ấy mệt lắm." },
          { en: "He can't be hungry. He's just had a big lunch.", vi: "Anh ấy không thể nào đói được. Anh ấy vừa ăn một bữa trưa no nê." },
        ],
      },
      {
        heading: "Mức độ chắc chắn",
        table: {
          head: ["Modal", "Mức độ", "Nghĩa tiếng Việt"],
          rows: [
            ["must", "Gần như chắc chắn ĐÚNG", "chắc hẳn là, ắt hẳn"],
            ["may / might / could", "Có thể đúng (khoảng 50%)", "có lẽ, có thể"],
            ["may not / might not", "Có thể KHÔNG đúng", "có lẽ không"],
            ["can't / couldn't", "Gần như chắc chắn KHÔNG đúng", "không thể nào"],
          ],
        },
        points: [
          "may, might và could gần như đồng nghĩa khi phỏng đoán; might có phần ít chắc chắn hơn một chút.",
        ],
      },
      {
        heading: "Công thức",
        formulas: [
          { label: "Trạng thái / sự việc", pattern: "S + must/may/might/could/can't + V" },
          { label: "Đang xảy ra", pattern: "S + must/may/might/could/can't + be + V-ing" },
          { label: "Phủ định (có lẽ không)", pattern: "S + may not/might not + V" },
        ],
        examples: [
          { en: "You've been travelling all day. You must be exhausted.", vi: "Bạn đi đường cả ngày rồi. Chắc bạn mệt rã rời." },
          { en: "Nam isn't at his desk. He might be in a meeting.", vi: "Nam không có ở bàn làm việc. Có lẽ anh ấy đang họp." },
          { en: "Someone's at the door. It could be the postman.", vi: "Có người ở ngoài cửa. Có thể là người đưa thư." },
          { en: "That can't be Mai's car. She sold it last month.", vi: "Đó không thể là xe của Mai được. Cô ấy bán nó tháng trước rồi." },
          { en: "The lights are on. They must be watching TV.", vi: "Đèn đang sáng. Chắc họ đang xem TV.", note: "Đang xảy ra → must be + V-ing." },
          { en: "Don't call him now. He may be sleeping.", vi: "Đừng gọi anh ấy lúc này. Có thể anh ấy đang ngủ." },
          { en: "I'm not sure, but she might not know about the party.", vi: "Tôi không chắc, nhưng có lẽ cô ấy không biết về bữa tiệc." },
        ],
      },
      {
        heading: "Lưu ý quan trọng",
        points: [
          "Phủ định của “must” (chắc chắn đúng) là “can't” (chắc chắn không đúng), KHÔNG phải “mustn't”. “mustn't” nghĩa là “cấm, không được phép”. (Trong tiếng Anh-Mỹ đôi khi gặp “must not” với nghĩa “chắc là không”, nhưng dùng “can't” là an toàn và phổ biến nhất.)",
          "Muốn nói “có lẽ không” thì dùng might not / may not. “couldn't” trong phỏng đoán mang nghĩa giống can't (chắc chắn không), không phải “có lẽ không”.",
          "“can” không dùng để phỏng đoán về một trường hợp cụ thể: nói “That could/might be Tom”, không nói “That can be Tom”. (“can” chỉ dùng cho khả năng chung: It can be very cold in Da Lat in winter.)",
          "Sau modal là động từ nguyên mẫu không “to”: She must be tired (không nói: must to be).",
          "Phỏng đoán về quá khứ dùng modal + have + V3 (must have gone, can't have seen...) – sẽ học ở trình độ B2.",
        ],
      },
    ],
    mistakes: [
      { wrong: "He mustn't be at home. The lights are off.", right: "He can't be at home. The lights are off.", why: "Phỏng đoán chắc chắn KHÔNG đúng dùng “can't”; “mustn't” nghĩa là cấm." },
      { wrong: "She must to be tired.", right: "She must be tired.", why: "Sau modal là động từ nguyên mẫu không “to”." },
      { wrong: "That can be Tom at the door.", right: "That could be Tom at the door.", why: "Phỏng đoán một trường hợp cụ thể dùng could/might/may, không dùng can." },
      { wrong: "They must be work now.", right: "They must be working now.", why: "Hành động đang diễn ra → must be + V-ing." },
      { wrong: "I'm not sure, but she couldn't be at home.", right: "I'm not sure, but she might not be at home.", why: "“couldn't” = chắc chắn không; khi không chắc thì dùng might not / may not." },
    ],
    exercises: [
      {
        kind: "choice",
        question: "You've been travelling all day. You ___ be exhausted.",
        options: ["must", "can't", "mustn't", "can"],
        answer: 0,
        explain: "Có bằng chứng rõ ràng (đi đường cả ngày) → gần như chắc chắn → must.",
      },
      {
        kind: "choice",
        question: "That ___ be Mai's car. She sold her car last month.",
        options: ["must", "might", "can't", "could"],
        answer: 2,
        explain: "Mai đã bán xe → chắc chắn không phải xe của cô ấy → can't.",
      },
      {
        kind: "fill",
        question: "He's only 16. He ___ a university student – that's impossible.",
        hint: "be",
        answers: ["can't be", "cannot be", "couldn't be", "could not be"],
        explain: "“that's impossible” → chắc chắn không đúng → can't be (couldn't be cũng được).",
      },
      {
        kind: "choice",
        question: "I'm not sure where Nam is. He ___ be in the library.",
        options: ["must", "might", "can't", "mustn't"],
        answer: 1,
        explain: "“I'm not sure” → chỉ là khả năng → might. “must” và “can't” thể hiện sự chắc chắn nên không hợp.",
      },
      {
        kind: "choice",
        question: "The light is on in Hoa's room. She ___ studying.",
        options: ["must", "can't be", "is must", "must be"],
        answer: 3,
        explain: "Phỏng đoán việc đang diễn ra → must be + V-ing. “must studying” thiếu “be”.",
      },
      {
        kind: "fill",
        question: "Don't phone them now. They ___ dinner.",
        hint: "might / have",
        answers: ["might be having"],
        explain: "Phỏng đoán hành động có thể đang diễn ra → might be + V-ing → might be having.",
      },
      {
        kind: "choice",
        question: "Kevin ___ be at work today. I'm not sure – maybe he's ill.",
        options: ["mustn't", "might not", "can't", "couldn't"],
        answer: 1,
        explain: "Người nói không chắc → “có lẽ không” → might not. “can't/couldn't” = chắc chắn không; “mustn't” = cấm.",
      },
      {
        kind: "fill",
        question: "Lan has just bought a big house and a new car. She ___ a lot of money.",
        hint: "must / earn",
        answers: ["must earn", "must be earning"],
        explain: "Có bằng chứng rõ ràng (mua nhà, mua xe) → gần như chắc chắn → must earn (hoặc must be earning).",
      },
    ],
  },
];
