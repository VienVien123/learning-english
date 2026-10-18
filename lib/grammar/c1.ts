import type { GrammarTopic } from "./types";

export const C1_TOPICS: GrammarTopic[] = [
  // ---------------------------------------------------------------------------
  // 1. Inversion after negative / restrictive adverbials
  // ---------------------------------------------------------------------------
  {
    id: "c1-inversion",
    level: "C1",
    title: "Đảo ngữ với trạng từ phủ định / hạn chế",
    titleEn: "Inversion after negative and restrictive adverbials",
    summary:
      "Khi một trạng từ hoặc cụm từ mang nghĩa phủ định/hạn chế (Never, Rarely, Little, No sooner, Only when, Not until...) đứng đầu câu, trợ động từ được đảo lên trước chủ ngữ để nhấn mạnh. Đây là cấu trúc trang trọng, hay gặp trong văn viết, bài phát biểu và bài thi.",
    sections: [
      {
        heading: "Đảo ngữ là gì và khi nào dùng?",
        text:
          "Trong câu bình thường, chủ ngữ đứng trước động từ: \"I have never seen such a mess.\" Khi muốn nhấn mạnh ý phủ định hoặc hạn chế, ta đưa trạng từ đó lên đầu câu và đảo trợ động từ lên trước chủ ngữ, giống trật tự của câu hỏi: \"Never have I seen such a mess.\"",
        points: [
          "Mục đích: nhấn mạnh, tạo hiệu quả tu từ, làm câu văn trang trọng hơn.",
          "Văn phong: trang trọng, mang tính văn viết hoặc diễn thuyết. Trong hội thoại hằng ngày, người bản xứ thường dùng câu bình thường (I've never seen...).",
          "Đảo ngữ chỉ xảy ra khi cụm phủ định/hạn chế đứng ĐẦU câu. Nếu nó nằm giữa câu thì giữ trật tự bình thường.",
        ],
      },
      {
        heading: "Cách đảo trợ động từ",
        text: "Quy tắc giống hệt cách tạo câu hỏi:",
        points: [
          "Nếu câu đã có trợ động từ (have, will, can, should, is/are...), đưa trợ động từ đó lên trước chủ ngữ: I have never seen → Never have I seen.",
          "Nếu câu không có trợ động từ (hiện tại đơn, quá khứ đơn), mượn do/does/did và động từ chính về dạng nguyên mẫu: She rarely goes out → Rarely does she go out.",
          "Nếu động từ chính là \"be\" ở thì đơn, đảo chính \"be\": He was seldom so happy → Seldom was he so happy.",
        ],
        formulas: [
          { label: "Có trợ động từ", pattern: "Adverbial + aux + S + V ..." },
          { label: "Không có trợ động từ", pattern: "Adverbial + do/does/did + S + V ..." },
          { label: "Động từ be", pattern: "Adverbial + am/is/are/was/were + S ..." },
        ],
      },
      {
        heading: "Các cấu trúc đảo ngữ thường gặp",
        formulas: [
          { label: "Never / Rarely / Seldom", pattern: "Never/Rarely/Seldom + aux + S + V ..." },
          { label: "Little (= hoàn toàn không)", pattern: "Little + do/does/did + S + know/realise/suspect/imagine ..." },
          { label: "Not only ... but also", pattern: "Not only + aux + S + V ..., but S + also + V ..." },
          { label: "Hardly / Scarcely / Barely ... when", pattern: "Hardly/Scarcely + had + S + V3 + when/before + S + V2" },
          { label: "No sooner ... than", pattern: "No sooner + had + S + V3 + than + S + V2" },
          { label: "Only after / Only when / Only if", pattern: "Only after/when/if + (S + V / N) + aux + S + V ..." },
          { label: "Only by / Only then", pattern: "Only by + V-ing/N + aux + S + V ... ; Only then + aux + S + V ..." },
          { label: "Not until", pattern: "Not until + (S + V / thời gian) + aux + S + V ..." },
          { label: "Under no circumstances / On no account / In no way", pattern: "Under no circumstances/On no account/In no way + aux + S + V ..." },
          { label: "At no time", pattern: "At no time + aux + S + V ..." },
        ],
        examples: [
          { en: "Never have I seen such a beautiful sunset.", vi: "Chưa bao giờ tôi thấy một hoàng hôn đẹp đến thế." },
          { en: "Rarely does she complain about her job.", vi: "Hiếm khi cô ấy phàn nàn về công việc." },
          { en: "Little did he know that his life was about to change.", vi: "Anh ấy hoàn toàn không biết rằng cuộc đời mình sắp thay đổi." },
          { en: "Not only did he forget my birthday, but he also forgot our anniversary.", vi: "Anh ấy không những quên sinh nhật tôi mà còn quên cả ngày kỷ niệm của chúng tôi." },
          { en: "Hardly had I closed my eyes when the phone rang.", vi: "Tôi vừa mới nhắm mắt thì điện thoại reo." },
          { en: "No sooner had we arrived than it started to rain.", vi: "Chúng tôi vừa đến nơi thì trời bắt đầu mưa." },
          { en: "Only after the meeting did I realise my mistake.", vi: "Mãi đến sau cuộc họp tôi mới nhận ra sai lầm của mình." },
          { en: "Only by working together can we solve this problem.", vi: "Chỉ bằng cách hợp tác chúng ta mới giải quyết được vấn đề này." },
          { en: "Not until I got home did I notice that my wallet was missing.", vi: "Mãi đến khi về đến nhà tôi mới nhận ra mình mất ví." },
          { en: "Under no circumstances should you open this door.", vi: "Trong bất kỳ trường hợp nào bạn cũng không được mở cánh cửa này." },
          { en: "At no time did the company admit that it was at fault.", vi: "Chưa lúc nào công ty thừa nhận mình có lỗi." },
          { en: "Seldom is the weather this warm in March.", vi: "Hiếm khi thời tiết tháng Ba ấm như thế này.", note: "Động từ chính là \"be\" nên đảo chính \"is\"." },
        ],
      },
      {
        heading: "Lưu ý quan trọng",
        points: [
          "Với Only after / Only when / Only if / Not until + mệnh đề: đảo ngữ nằm ở MỆNH ĐỀ CHÍNH (vế sau), không đảo trong mệnh đề đi sau when/after/until. Ví dụ: Only when I saw her face did I understand. (không phải Only when did I see her face...)",
          "Hardly/Scarcely/Barely đi với \"when\" (hoặc \"before\"); No sooner đi với \"than\". Không dùng \"No sooner ... when\" hay \"Hardly ... than\".",
          "Hai cấu trúc trên thường dùng thì quá khứ hoàn thành (had + V3) cho hành động xảy ra trước, quá khứ đơn cho hành động xảy ra ngay sau.",
          "\"Little\" trong đảo ngữ mang nghĩa \"hoàn toàn không\", thường đi với know, realise, suspect, think, imagine.",
          "\"Only\" bổ nghĩa cho chủ ngữ thì KHÔNG đảo ngữ: Only John knew the answer. (Only John là chủ ngữ.)",
          "\"Not only\" nằm giữa câu thì không đảo: He not only lied but also stole money.",
          "Trong tiếng Anh nói hằng ngày, các câu đảo ngữ có thể nghe khá trịnh trọng hoặc văn chương; hãy dùng chủ yếu trong bài viết, bài luận, thư trang trọng.",
        ],
      },
      {
        heading: "So sánh câu thường và câu đảo ngữ",
        table: {
          head: ["Câu bình thường", "Câu đảo ngữ (trang trọng)"],
          rows: [
            ["I have never been so embarrassed.", "Never have I been so embarrassed."],
            ["He didn't realise the danger at all.", "Little did he realise the danger."],
            ["As soon as I sat down, the phone rang.", "No sooner had I sat down than the phone rang. / Hardly had I sat down when the phone rang."],
            ["I didn't understand until she explained.", "Not until she explained did I understand."],
            ["You must not tell anyone under any circumstances.", "Under no circumstances must you tell anyone."],
            ["We can only succeed if we work hard.", "Only if we work hard can we succeed."],
          ],
        },
      },
    ],
    mistakes: [
      {
        wrong: "Never I have seen such a mess.",
        right: "Never have I seen such a mess.",
        why: "Khi Never đứng đầu câu, trợ động từ (have) phải đảo lên trước chủ ngữ.",
      },
      {
        wrong: "Rarely she goes out at night.",
        right: "Rarely does she go out at night.",
        why: "Câu hiện tại đơn không có trợ động từ nên phải mượn does, và động từ chính trở về nguyên mẫu (go).",
      },
      {
        wrong: "No sooner had I arrived when it started to rain.",
        right: "No sooner had I arrived than it started to rain.",
        why: "No sooner đi với than; còn Hardly/Scarcely mới đi với when.",
      },
      {
        wrong: "Only when I got home I realised I had lost my keys.",
        right: "Only when I got home did I realise I had lost my keys.",
        why: "Sau cụm Only when + mệnh đề, mệnh đề chính phải đảo ngữ (did I realise).",
      },
      {
        wrong: "Not until did he arrive at midnight we could start.",
        right: "Not until he arrived at midnight could we start.",
        why: "Mệnh đề sau Not until giữ trật tự bình thường; chỉ mệnh đề chính mới đảo ngữ.",
      },
    ],
    exercises: [
      {
        kind: "choice",
        question: "Never ___ such a rude person in my whole life.",
        options: ["have I met", "I have met", "I met", "met I"],
        answer: 0,
        explain:
          "Never đứng đầu câu → đảo trợ động từ have lên trước chủ ngữ: Never have I met... \"I have met\" sai vì không đảo; \"met I\" sai vì không đảo động từ chính trong tiếng Anh hiện đại.",
      },
      {
        kind: "choice",
        question: "No sooner had we sat down ___ the lights went out.",
        options: ["when", "than", "then", "that"],
        answer: 1,
        explain: "Cấu trúc cố định: No sooner + had + S + V3 + than + S + V2. \"when\" chỉ đi với Hardly/Scarcely.",
      },
      {
        kind: "choice",
        question: "Only after he had apologised ___ to speak to him again.",
        options: ["she agreed", "agreed she", "she did agree", "did she agree"],
        answer: 3,
        explain:
          "Với Only after + mệnh đề, mệnh đề chính phải đảo ngữ. Câu quá khứ đơn không có trợ động từ nên mượn did: did she agree.",
      },
      {
        kind: "choice",
        question: "Hardly ___ the house when it started to pour with rain.",
        options: ["I had left", "I left", "had I left", "have I left"],
        answer: 2,
        explain:
          "Hardly đứng đầu câu → đảo ngữ, và cấu trúc chuẩn là Hardly + had + S + V3 + when + S + V2. \"have I left\" sai thì vì vế sau ở quá khứ (started).",
      },
      {
        kind: "choice",
        question: "On no account ___ the door to strangers.",
        options: ["you should open", "should you open", "you open", "open you"],
        answer: 1,
        explain: "On no account (tuyệt đối không) đứng đầu câu → đảo trợ động từ should lên trước chủ ngữ: should you open.",
      },
      {
        kind: "fill",
        question: "Little ___ that his life was about to change forever.",
        answers: ["did he know"],
        hint: "he / know",
        explain:
          "Little đầu câu mang nghĩa \"hoàn toàn không\" → đảo ngữ. Câu ở quá khứ (was about to) và không có trợ động từ nên dùng did + S + V nguyên mẫu: did he know.",
      },
      {
        kind: "fill",
        question: "Not until the results were published ___ how serious the problem was.",
        answers: ["did we realise", "did we realize"],
        hint: "we / realise",
        explain:
          "Not until + mệnh đề đứng đầu → đảo ngữ ở mệnh đề chính. Quá khứ đơn nên mượn did: did we realise (realize là chính tả Anh-Mỹ).",
      },
      {
        kind: "fill",
        question: "Not only ___ late, but she also forgot her ticket.",
        answers: ["did she arrive"],
        hint: "she / arrive",
        explain:
          "Not only đứng đầu câu → vế đầu đảo ngữ. Quá khứ đơn (forgot) nên dùng did + S + V: did she arrive. Vế sau (but she also...) giữ trật tự bình thường.",
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // 2. Inverted conditionals and other conditional expressions
  // ---------------------------------------------------------------------------
  {
    id: "c1-inverted-conditionals",
    level: "C1",
    title: "Đảo ngữ câu điều kiện và các cách diễn đạt điều kiện khác",
    titleEn: "Inverted conditionals and alternatives to if",
    summary:
      "Học cách bỏ \"if\" và đảo Should / Were / Had lên đầu mệnh đề điều kiện để câu trang trọng hơn, cùng các cách diễn đạt điều kiện khác như but for, without, otherwise, provided that, on condition that, supposing.",
    sections: [
      {
        heading: "Đảo ngữ câu điều kiện là gì?",
        text:
          "Trong văn phong trang trọng, ta có thể bỏ \"if\" và đưa should, were hoặc had lên trước chủ ngữ. Nghĩa của câu không đổi, chỉ có sắc thái trang trọng hơn. Cấu trúc này hay gặp trong thư từ công việc, văn bản hành chính, bài luận.",
        points: [
          "Chỉ ba từ được đảo: Should (loại 1), Were (loại 2), Had (loại 3). Không đảo các trợ động từ khác như do/does/did hay will.",
          "Khi đã đảo ngữ thì KHÔNG dùng \"if\" nữa.",
          "Mệnh đề chính giữ nguyên như câu điều kiện thông thường.",
        ],
      },
      {
        heading: "Công thức",
        formulas: [
          { label: "Loại 1 (Should)", pattern: "Should + S + V ..., S + will/can/may + V ... / câu mệnh lệnh" },
          { label: "Loại 2 (Were + to V)", pattern: "Were + S + to V ..., S + would/could/might + V ..." },
          { label: "Loại 2 (Were với be)", pattern: "Were + S + adj/N/cụm giới từ ..., S + would + V ..." },
          { label: "Loại 3 (Had)", pattern: "Had + S + V3 ..., S + would/could/might + have + V3 ..." },
          { label: "Hỗn hợp (quá khứ → hiện tại)", pattern: "Had + S + V3 ..., S + would + V ... (now)" },
        ],
        examples: [
          { en: "Should you need any help, please call me.", vi: "Nếu bạn cần giúp đỡ, hãy gọi cho tôi.", note: "= If you need / If you should need any help..." },
          { en: "Should the item be faulty, we will replace it free of charge.", vi: "Nếu sản phẩm bị lỗi, chúng tôi sẽ đổi miễn phí." },
          { en: "Were the government to raise taxes, there would be protests.", vi: "Nếu chính phủ tăng thuế, sẽ có biểu tình." },
          { en: "Were I you, I would accept the offer.", vi: "Nếu tôi là bạn, tôi sẽ nhận lời đề nghị đó." },
          { en: "Had I known about the meeting, I would have come.", vi: "Nếu tôi biết về cuộc họp thì tôi đã đến rồi." },
          { en: "Had she taken the job, she would be living in London now.", vi: "Nếu hồi đó cô ấy nhận công việc ấy thì giờ cô ấy đang sống ở London." },
        ],
      },
      {
        heading: "Dạng phủ định",
        text:
          "Ở dạng đảo ngữ, \"not\" đứng SAU chủ ngữ và KHÔNG được viết tắt với trợ động từ.",
        formulas: [
          { label: "Loại 1", pattern: "Should + S + not + V ..." },
          { label: "Loại 2", pattern: "Were + S + not + to V ... / Were it not for + N ..." },
          { label: "Loại 3", pattern: "Had + S + not + V3 ... / Had it not been for + N ..." },
        ],
        examples: [
          { en: "Had I not missed the train, I would have arrived on time.", vi: "Nếu tôi không lỡ chuyến tàu thì tôi đã đến đúng giờ.", note: "Không viết \"Hadn't I missed...\"." },
          { en: "Were it not for your help, I would be in serious trouble.", vi: "Nếu không có sự giúp đỡ của bạn, tôi sẽ gặp rắc rối lớn.", note: "= If it weren't for your help..." },
          { en: "Had it not been for the rain, we would have won the match.", vi: "Nếu không vì cơn mưa, chúng tôi đã thắng trận đấu.", note: "= If it hadn't been for the rain..." },
          { en: "Should you not receive a reply within a week, please contact us again.", vi: "Nếu trong vòng một tuần bạn không nhận được phản hồi, vui lòng liên hệ lại với chúng tôi." },
        ],
      },
      {
        heading: "Các cách diễn đạt điều kiện khác",
        points: [
          "But for + N (trang trọng) = If it weren't/hadn't been for: But for your advice, I would have made a terrible mistake.",
          "Without + N (thông dụng hơn but for): Without water, nothing could survive.",
          "Otherwise (nếu không thì): We must leave now; otherwise, we'll miss the train.",
          "Provided / Providing (that) (với điều kiện là): You can borrow my car provided (that) you drive carefully. \"Providing\" hơi thân mật hơn \"provided\".",
          "On condition that (trang trọng, nhấn mạnh điều kiện bắt buộc): You can use the hall on condition that you leave it clean. (Có thể gặp \"on the condition that\", nhất là Anh-Mỹ.)",
          "Supposing / Suppose (giả sử): Supposing you lost your job, what would you do?",
          "Sau provided/providing/on condition that/as long as, dùng thì hiện tại để nói về tương lai, không dùng will: provided you finish (không phải provided you will finish).",
        ],
        examples: [
          { en: "But for the seat belt, she would have been seriously injured.", vi: "Nếu không có dây an toàn, cô ấy đã bị thương nặng." },
          { en: "Hurry up, otherwise we'll be late.", vi: "Nhanh lên, nếu không chúng ta sẽ trễ." },
          { en: "You can go to the party providing you're home by midnight.", vi: "Con có thể đi dự tiệc với điều kiện về nhà trước nửa đêm." },
          { en: "Supposing it rains tomorrow, where will we have the picnic?", vi: "Giả sử mai trời mưa thì chúng ta sẽ đi dã ngoại ở đâu?" },
        ],
      },
      {
        heading: "Bảng so sánh: if và đảo ngữ",
        table: {
          head: ["Loại", "Câu với if", "Câu đảo ngữ"],
          rows: [
            ["Loại 1", "If you need help, call me.", "Should you need help, call me."],
            ["Loại 2", "If I were you, I'd wait.", "Were I you, I'd wait."],
            ["Loại 2 (to V)", "If he were to resign, ...", "Were he to resign, ..."],
            ["Loại 3", "If I had known, I'd have come.", "Had I known, I'd have come."],
            ["Phủ định loại 3", "If I hadn't seen it, ...", "Had I not seen it, ..."],
            ["Với it", "If it weren't for him, ...", "Were it not for him, ... / But for him, ..."],
          ],
        },
      },
    ],
    mistakes: [
      {
        wrong: "Hadn't I missed the train, I would have arrived on time.",
        right: "Had I not missed the train, I would have arrived on time.",
        why: "Trong đảo ngữ điều kiện, not đứng sau chủ ngữ và không viết tắt với had.",
      },
      {
        wrong: "Was I you, I would accept the offer.",
        right: "Were I you, I would accept the offer.",
        why: "Đảo ngữ loại 2 luôn dùng Were cho mọi ngôi; không đảo \"Was\".",
      },
      {
        wrong: "If had I known, I would have told you.",
        right: "Had I known, I would have told you.",
        why: "Đã đảo ngữ thì bỏ if; không dùng if cùng lúc với đảo ngữ.",
      },
      {
        wrong: "Should you will need more information, please contact us.",
        right: "Should you need more information, please contact us.",
        why: "Sau Should + S là động từ nguyên mẫu, không thêm will.",
      },
      {
        wrong: "You can borrow it provided that you will return it tomorrow.",
        right: "You can borrow it provided that you return it tomorrow.",
        why: "Sau provided (that) dùng thì hiện tại để nói về tương lai, giống như sau if.",
      },
    ],
    exercises: [
      {
        kind: "choice",
        question: "___ you require further information, please do not hesitate to contact us.",
        options: ["Should", "Were", "Had", "Would"],
        answer: 0,
        explain: "Điều kiện loại 1 (khả năng có thật ở hiện tại/tương lai) → Should + S + V nguyên mẫu. Were cần \"to V\"; Had cần V3.",
      },
      {
        kind: "choice",
        question: "___ known about the traffic, we would have taken the train.",
        options: ["Should we", "Were we", "Had we", "If had we"],
        answer: 2,
        explain: "Vế chính would have taken → loại 3 → Had + S + V3: Had we known. \"If had we\" sai vì không dùng if khi đã đảo ngữ.",
      },
      {
        kind: "choice",
        question: "___ for your support, I would never have finished the project.",
        options: ["Hadn't it been", "Had it not been", "Were it not been", "If it had been"],
        answer: 1,
        explain:
          "Loại 3 phủ định: Had it not been for... = If it hadn't been for... Không viết tắt \"Hadn't it been\"; \"If it had been\" mang nghĩa ngược lại.",
      },
      {
        kind: "choice",
        question: "___ the president to resign, there would be a general election.",
        options: ["Should", "Had", "Were", "Was"],
        answer: 2,
        explain: "Có \"to resign\" và vế chính would be → loại 2: Were + S + to V. Không đảo \"Was\".",
      },
      {
        kind: "choice",
        question: "You can borrow the car ___ you bring it back by six o'clock.",
        options: ["otherwise", "unless", "but for", "provided"],
        answer: 3,
        explain:
          "provided (that) = với điều kiện là. \"unless\" (trừ khi) làm câu sai nghĩa; \"but for\" đi với danh từ; \"otherwise\" nghĩa là \"nếu không thì\".",
      },
      {
        kind: "fill",
        question: "___ harder, he would have passed the exam.",
        answers: ["Had he studied"],
        hint: "he / study",
        explain: "Vế chính would have passed → loại 3. Đảo ngữ: Had + S + V3 → Had he studied.",
      },
      {
        kind: "fill",
        question: "___ in my position, what would you do?",
        answers: ["Were you"],
        hint: "you / be",
        explain: "Giả định trái hiện tại (loại 2) với động từ be → Were + S: Were you in my position = If you were in my position.",
      },
      {
        kind: "fill",
        question: "Had she ___ the bus, she would have been on time.",
        answers: ["not missed"],
        hint: "not / miss",
        explain: "Phủ định của đảo ngữ loại 3: Had + S + not + V3 → Had she not missed (không viết \"Hadn't she missed\").",
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // 3. Cleft sentences
  // ---------------------------------------------------------------------------
  {
    id: "c1-cleft",
    level: "C1",
    title: "Câu chẻ (câu nhấn mạnh)",
    titleEn: "Cleft sentences",
    summary:
      "Câu chẻ tách một câu đơn thành hai phần để làm nổi bật một thông tin: It is/was ... that/who ...; What ... is/was ...; All (that) ... is ...; The thing/reason/place ... is ... Bài học cũng hướng dẫn nhấn mạnh hành động bằng What sb did was (to) V.",
    sections: [
      {
        heading: "Câu chẻ là gì và khi nào dùng?",
        text:
          "Câu chẻ (cleft sentence) \"chẻ\" một mệnh đề thành hai phần để dồn sự chú ý vào một thành phần: người, vật, thời gian, nơi chốn, lý do hay hành động. Ta dùng câu chẻ để nhấn mạnh thông tin mới, sửa lại thông tin sai hoặc tạo sự đối lập.",
        examples: [
          { en: "Tom broke the window. → It was Tom who broke the window (not me).", vi: "Chính Tom đã làm vỡ cửa sổ (chứ không phải tôi)." },
          { en: "I need a holiday. → What I need is a holiday.", vi: "Thứ tôi cần là một kỳ nghỉ." },
        ],
      },
      {
        heading: "Câu chẻ với It is / It was",
        formulas: [
          { label: "Nhấn mạnh người", pattern: "It is/was + người + who/that + V ..." },
          { label: "Nhấn mạnh vật", pattern: "It is/was + vật + that + S + V ..." },
          { label: "Nhấn mạnh thời gian/nơi chốn/lý do", pattern: "It is/was + trạng ngữ + that + S + V ..." },
          { label: "Not until", pattern: "It is/was not until + thời gian/mệnh đề + that + S + V ..." },
        ],
        points: [
          "Dùng \"is\" cho hiện tại, \"was\" cho quá khứ. \"It\" luôn đi với động từ số ít (It was my parents who..., không phải It were...).",
          "Người: dùng who hoặc that. Vật, thời gian, nơi chốn: dùng that. Với trạng ngữ thời gian/nơi chốn, \"that\" là lựa chọn chuẩn (It was in 2010 that...); when/where đôi khi gặp trong văn nói thân mật.",
          "Động từ sau who/that chia theo thành phần được nhấn mạnh: It is my parents who are worried.",
        ],
        examples: [
          { en: "It was my brother who called you last night.", vi: "Chính anh trai tôi đã gọi cho bạn tối qua." },
          { en: "It was in Paris that they first met.", vi: "Chính ở Paris họ đã gặp nhau lần đầu." },
          { en: "It is the price that worries me, not the quality.", vi: "Điều làm tôi lo là giá cả, không phải chất lượng." },
          { en: "It wasn't until midnight that he finally came home.", vi: "Mãi đến nửa đêm anh ấy mới về nhà." },
          { en: "It was because of the fog that the flight was cancelled.", vi: "Chính vì sương mù mà chuyến bay bị hủy." },
        ],
      },
      {
        heading: "Câu chẻ với What / All / The thing ...",
        formulas: [
          { label: "What-cleft", pattern: "What + S + V + is/was + phần nhấn mạnh" },
          { label: "Đảo vị trí", pattern: "Phần nhấn mạnh + is/was + what + S + V" },
          { label: "All (= điều duy nhất)", pattern: "All (that) + S + V + is/was + phần nhấn mạnh" },
          { label: "The thing/reason/place/person", pattern: "The thing/reason (why)/place (where)/person (who) + S + V + is/was + ..." },
        ],
        examples: [
          { en: "What surprised me was his attitude.", vi: "Điều làm tôi ngạc nhiên là thái độ của anh ấy." },
          { en: "A good night's sleep is what you need.", vi: "Một giấc ngủ ngon là thứ bạn cần." },
          { en: "All I want is some peace and quiet.", vi: "Tất cả những gì tôi muốn chỉ là chút yên tĩnh." },
          { en: "The reason I left was that I felt undervalued.", vi: "Lý do tôi nghỉ việc là tôi cảm thấy không được coi trọng." },
          { en: "The place where we stayed was a small hotel by the sea.", vi: "Nơi chúng tôi ở là một khách sạn nhỏ bên bờ biển." },
          { en: "The person who helped me most was my aunt.", vi: "Người giúp tôi nhiều nhất là dì tôi." },
        ],
      },
      {
        heading: "Nhấn mạnh hành động: What sb did was (to) V",
        text:
          "Câu chẻ với It không nhấn mạnh được động từ. Muốn nhấn mạnh hành động, dùng What + S + do/did + is/was + (to) V. \"to\" có thể có hoặc không; trong văn nói thường bỏ \"to\".",
        formulas: [
          { label: "Hành động", pattern: "What + S + did + was + (to) V ..." },
          { label: "Sự việc", pattern: "What happened was (that) + S + V ..." },
          { label: "Với All", pattern: "All + S + did + was + (to) V ..." },
        ],
        examples: [
          { en: "What he did was (to) call the police.", vi: "Việc anh ấy làm là gọi cảnh sát." },
          { en: "What you should do is talk to your manager.", vi: "Điều bạn nên làm là nói chuyện với quản lý của mình." },
          { en: "What happened was that the car broke down on the motorway.", vi: "Chuyện xảy ra là chiếc xe bị hỏng trên đường cao tốc." },
          { en: "All I did was ask a simple question.", vi: "Tôi chỉ hỏi một câu đơn giản thôi mà." },
        ],
      },
      {
        heading: "Lưu ý và bảng tổng hợp",
        points: [
          "Không thêm chủ ngữ thừa sau What-clause: What I need is... (không viết What I need it is...).",
          "Sau \"The reason ... is\", văn viết trang trọng dùng \"that\"; \"The reason ... is because ...\" rất phổ biến trong văn nói nhưng nhiều người coi là thừa, nên tránh trong bài viết học thuật.",
          "Sau \"What ... did was\", động từ ở dạng nguyên mẫu (có hoặc không có to), không chia thì: What she did was leave (không phải was left).",
        ],
        table: {
          head: ["Câu gốc", "Câu chẻ", "Nhấn mạnh"],
          rows: [
            ["Anna sent the email.", "It was Anna who sent the email.", "Người làm"],
            ["We met in 2015.", "It was in 2015 that we met.", "Thời gian"],
            ["I hate his arrogance.", "What I hate is his arrogance.", "Đối tượng"],
            ["I only want to rest.", "All I want is to rest.", "Điều duy nhất"],
            ["She resigned.", "What she did was resign.", "Hành động"],
            ["I came because I was worried.", "The reason I came was that I was worried.", "Lý do"],
          ],
        },
      },
    ],
    mistakes: [
      {
        wrong: "It was my sister which told me the news.",
        right: "It was my sister who/that told me the news.",
        why: "Thành phần nhấn mạnh là người nên dùng who hoặc that, không dùng which.",
      },
      {
        wrong: "What I need it is a long rest.",
        right: "What I need is a long rest.",
        why: "Mệnh đề What I need đã làm chủ ngữ; không thêm \"it\".",
      },
      {
        wrong: "What he did was he called the police.",
        right: "What he did was (to) call the police.",
        why: "Sau What ... did was dùng động từ nguyên mẫu (có/không có to), không lặp lại chủ ngữ và không chia thì.",
      },
      {
        wrong: "It were my parents who paid for the trip.",
        right: "It was my parents who paid for the trip.",
        why: "Trong câu chẻ, \"It\" luôn đi với is/was số ít, dù thành phần nhấn mạnh là số nhiều.",
      },
    ],
    exercises: [
      {
        kind: "choice",
        question: "It was my brother ___ broke the vase, not me.",
        options: ["which", "who", "what", "whom"],
        answer: 1,
        explain: "Nhấn mạnh người làm chủ ngữ của broke → dùng who (hoặc that). \"whom\" chỉ dùng cho tân ngữ; which dùng cho vật.",
      },
      {
        kind: "choice",
        question: "___ I need right now is a cup of strong coffee.",
        options: ["That", "Which", "What", "It"],
        answer: 2,
        explain: "Câu chẻ What-cleft: What + S + V + is + phần nhấn mạnh. What = the thing that.",
      },
      {
        kind: "choice",
        question: "All you have to do ___ press this button.",
        options: ["is", "are", "is that", "does"],
        answer: 0,
        explain: "All (that) + S + V + is + (to) V. All ở đây là \"điều duy nhất\" nên dùng is số ít; không cần that trước động từ nguyên mẫu.",
      },
      {
        kind: "choice",
        question: "It was not until she got home ___ she noticed her phone was missing.",
        options: ["when", "then", "until", "that"],
        answer: 3,
        explain: "Cấu trúc cố định: It was not until ... that ... (mãi đến khi ... mới ...).",
      },
      {
        kind: "choice",
        question: "What he did next ___ the police.",
        options: ["was called", "did call", "was call", "calling"],
        answer: 2,
        explain:
          "Nhấn mạnh hành động: What + S + did + was + (to) V → was call. \"was called\" sai vì biến thành bị động (anh ấy được gọi là cảnh sát).",
      },
      {
        kind: "fill",
        question: "It ___ in Paris that they first met in 1998.",
        answers: ["was"],
        hint: "be",
        explain: "Sự việc ở quá khứ (1998) → It was ... that ...",
      },
      {
        kind: "fill",
        question: "What ___ me most was his complete lack of interest.",
        answers: ["surprised"],
        hint: "surprise",
        explain: "Mệnh đề What ... ở quá khứ (vì vế sau là was) → What surprised me most was...",
      },
      {
        kind: "fill",
        question: "The reason I'm calling ___ that I need your advice.",
        answers: ["is"],
        hint: "be",
        explain: "The reason + mệnh đề hiện tại (I'm calling) + is + that ... Trong văn trang trọng dùng \"is that\" thay vì \"is because\".",
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // 4. The subjunctive and unreal past
  // ---------------------------------------------------------------------------
  {
    id: "c1-subjunctive",
    level: "C1",
    title: "Giả định cách (Subjunctive)",
    titleEn: "The subjunctive and the unreal past",
    summary:
      "Học thể giả định sau các động từ và tính từ chỉ đề nghị, yêu cầu, sự cần thiết (suggest that he go, It is essential that she be...), và cách dùng quá khứ không có thật sau It's time, would rather, as if / as though.",
    sections: [
      {
        heading: "Giả định cách là gì?",
        text:
          "Giả định cách (mandative subjunctive) dùng động từ NGUYÊN MẪU cho mọi chủ ngữ, không thêm -s ở ngôi thứ ba và không lùi thì, để diễn tả một điều được đề nghị, yêu cầu hoặc được coi là cần thiết — chưa phải sự thật.",
        points: [
          "Mọi ngôi đều dùng V nguyên mẫu: that he go, that she be, that they arrive.",
          "Không lùi thì: The doctor suggested that he rest (dù suggested ở quá khứ).",
          "Anh-Mỹ dùng giả định cách rất phổ biến. Anh-Anh thường dùng should + V; trong văn nói thân mật, Anh-Anh còn dùng thì thường (that he rests).",
          "Văn phong: tương đối trang trọng, gặp nhiều trong văn bản, báo chí, thư công việc.",
        ],
      },
      {
        heading: "Sau động từ: suggest, recommend, insist, demand, propose...",
        formulas: [
          { label: "Khẳng định", pattern: "S + suggest/recommend/insist/demand/propose/request + that + S + (should) + V" },
          { label: "Phủ định", pattern: "... that + S + not + V / ... that + S + should not + V" },
          { label: "Bị động", pattern: "... that + S + (should) + be + V3" },
        ],
        examples: [
          { en: "The doctor suggested that he stop smoking.", vi: "Bác sĩ đề nghị anh ấy bỏ thuốc lá." },
          { en: "I suggest that she should see a specialist.", vi: "Tôi đề nghị cô ấy nên đi khám bác sĩ chuyên khoa.", note: "Dạng should + V phổ biến trong Anh-Anh." },
          { en: "They demanded that the manager apologise.", vi: "Họ yêu cầu người quản lý xin lỗi." },
          { en: "The committee recommended that the plan be approved.", vi: "Ủy ban kiến nghị phê duyệt kế hoạch." },
          { en: "We insisted that he not drive home after the party.", vi: "Chúng tôi nhất quyết không để anh ấy lái xe về nhà sau bữa tiệc." },
        ],
        points: [
          "Không dùng suggest + O + to V: The doctor suggested him to rest ✗. Dùng suggest that he (should) rest hoặc suggest + V-ing (suggested resting).",
          "\"insist that\" mang nghĩa \"khẳng định một sự thật\" thì chia thì bình thường: He insisted that he had paid the bill. (Anh ấy khăng khăng là đã trả tiền.)",
        ],
      },
      {
        heading: "Sau tính từ: essential, vital, important, necessary...",
        formulas: [
          { label: "Tính từ", pattern: "It is essential/vital/important/necessary/crucial/imperative + that + S + (should) + V" },
          { label: "Cách khác", pattern: "It is essential/important + for + O + to V" },
        ],
        examples: [
          { en: "It is essential that every student be on time for the exam.", vi: "Điều cốt yếu là mọi học sinh phải có mặt đúng giờ thi." },
          { en: "It is vital that the patient should not be moved.", vi: "Điều rất quan trọng là không được di chuyển bệnh nhân." },
          { en: "It is important for everyone to wear a helmet.", vi: "Mọi người đều cần đội mũ bảo hiểm." },
        ],
      },
      {
        heading: "Quá khứ không có thật: It's time, would rather, as if",
        formulas: [
          { label: "It's time", pattern: "It's (high/about) time + S + V2" },
          { label: "It's time (cách khác)", pattern: "It's time (for + O) + to V" },
          { label: "would rather (hiện tại/tương lai)", pattern: "S1 + would rather + S2 + V2" },
          { label: "would rather (quá khứ)", pattern: "S1 + would rather + S2 + had + V3" },
          { label: "would rather (cùng chủ ngữ)", pattern: "S + would rather + V (+ than + V)" },
          { label: "as if / as though (không có thật)", pattern: "S + V + as if/as though + S + V2 / had + V3" },
        ],
        points: [
          "It's high time / It's about time nhấn mạnh rằng việc đó lẽ ra phải làm từ trước: It's high time you got a job.",
          "would rather + S + V2 diễn tả mong muốn ai đó làm/không làm gì ở hiện tại hoặc tương lai: I'd rather you didn't smoke here.",
          "would rather + S + had V3 diễn tả tiếc nuối về quá khứ: I'd rather you hadn't told him.",
          "as if/as though + hiện tại khi điều đó có thể đúng: It looks as if it's going to rain. Dùng quá khứ (V2/were) khi điều đó không có thật: He talks as if he knew everything. Dùng had V3 cho sự việc trước đó: She looked as if she had seen a ghost.",
          "Sau as if / would rather / It's time, \"were\" dùng được cho mọi ngôi (trang trọng); \"was\" phổ biến trong văn nói.",
        ],
        examples: [
          { en: "It's time we went home.", vi: "Đã đến lúc chúng ta về nhà rồi." },
          { en: "It's high time the government did something about pollution.", vi: "Đã đến lúc chính phủ phải làm gì đó về ô nhiễm (lẽ ra phải làm từ lâu)." },
          { en: "I'd rather you came tomorrow.", vi: "Tôi muốn bạn đến vào ngày mai hơn." },
          { en: "I'd rather you hadn't told him the truth.", vi: "Giá mà bạn đừng nói sự thật với anh ấy." },
          { en: "He behaves as if he owned the place.", vi: "Anh ta cư xử như thể anh ta là chủ chỗ này." },
        ],
      },
      {
        heading: "Bảng tổng hợp",
        table: {
          head: ["Cấu trúc", "Dạng động từ", "Ví dụ"],
          rows: [
            ["suggest/insist/demand that", "S + (should) + V", "She insisted that he (should) leave."],
            ["It is essential/vital that", "S + (should) + V", "It is vital that he (should) be told."],
            ["It's (high) time", "S + V2", "It's time you went to bed."],
            ["would rather (hiện tại)", "S + V2", "I'd rather you stayed."],
            ["would rather (quá khứ)", "S + had V3", "I'd rather you hadn't gone."],
            ["as if (không có thật)", "S + V2 / had V3", "He acts as if he were the boss."],
          ],
        },
      },
    ],
    mistakes: [
      {
        wrong: "The doctor suggested him to stop smoking.",
        right: "The doctor suggested that he (should) stop smoking.",
        why: "suggest không đi với cấu trúc O + to V. Dùng suggest that + S + (should) + V hoặc suggest + V-ing.",
      },
      {
        wrong: "They demanded that the manager to be fired.",
        right: "They demanded that the manager be fired.",
        why: "Sau demand that, động từ ở dạng nguyên mẫu không \"to\": be fired (hoặc should be fired).",
      },
      {
        wrong: "It's time we go home.",
        right: "It's time we went home.",
        why: "Sau It's time + S, dùng quá khứ đơn (V2) dù nói về hiện tại. Hoặc dùng It's time to go home.",
      },
      {
        wrong: "I'd rather you don't tell anyone.",
        right: "I'd rather you didn't tell anyone.",
        why: "would rather + chủ ngữ khác → động từ lùi về quá khứ đơn để nói về hiện tại/tương lai.",
      },
      {
        wrong: "I'd rather to stay at home tonight.",
        right: "I'd rather stay at home tonight.",
        why: "would rather + V nguyên mẫu không có \"to\" khi cùng một chủ ngữ.",
      },
    ],
    exercises: [
      {
        kind: "choice",
        question: "The lawyer insisted that his client ___ released immediately.",
        options: ["is", "be", "to be", "being"],
        answer: 1,
        explain:
          "insist that (yêu cầu) + S + (should) + V nguyên mẫu → be released. Không dùng \"to be\" hay \"being\" sau that.",
      },
      {
        kind: "choice",
        question: "It's high time the government ___ something about pollution.",
        options: ["does", "do", "did", "has done"],
        answer: 2,
        explain: "It's high time + S + V2 (quá khứ đơn) để nói việc lẽ ra phải làm từ lâu → did.",
      },
      {
        kind: "choice",
        question: "I'd rather you ___ my car without asking.",
        options: ["didn't borrow", "don't borrow", "won't borrow", "not borrow"],
        answer: 0,
        explain: "would rather + chủ ngữ khác + V2 (quá khứ đơn) cho hiện tại/tương lai → didn't borrow.",
      },
      {
        kind: "choice",
        question: "It is vital that every passenger ___ a seat belt during take-off.",
        options: ["wear", "wore", "to wear", "wearing"],
        answer: 0,
        explain:
          "It is vital that + S + (should) + V nguyên mẫu → wear. Không lùi thì (wore) và không dùng to V/V-ing sau that.",
      },
      {
        kind: "choice",
        question: "She looked pale and shaken, as if she ___ a ghost.",
        options: ["has seen", "sees", "would see", "had seen"],
        answer: 3,
        explain:
          "as if + điều không có thật xảy ra trước thời điểm \"looked\" (quá khứ) → had + V3: had seen.",
      },
      {
        kind: "fill",
        question: "The committee recommended that the proposal ___ without delay.",
        answers: ["be approved", "should be approved"],
        hint: "approve",
        explain:
          "recommend that + S + (should) + V; đề xuất được phê duyệt nên dùng bị động: be approved (Anh-Mỹ, trang trọng) hoặc should be approved (Anh-Anh).",
      },
      {
        kind: "fill",
        question: "I'd rather you ___ him the truth last night; now he's really upset.",
        answers: ["hadn't told", "had not told"],
        hint: "not / tell",
        explain: "Tiếc nuối về quá khứ (last night) với would rather + chủ ngữ khác → had + V3: hadn't told.",
      },
      {
        kind: "fill",
        question: "You're 30 now. It's about time you ___ a proper job.",
        answers: ["got"],
        hint: "get",
        explain: "It's about time + S + V2 → got. Dùng quá khứ đơn dù nói về hiện tại.",
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // 5. Participle clauses
  // ---------------------------------------------------------------------------
  {
    id: "c1-participle-clauses",
    level: "C1",
    title: "Mệnh đề phân từ",
    titleEn: "Participle clauses",
    summary:
      "Mệnh đề phân từ (V-ing, V3, Having + V3, Having been + V3) giúp rút gọn câu, làm văn viết ngắn gọn và trang trọng hơn. Điều kiện quan trọng nhất: chủ ngữ ngầm của phân từ phải trùng với chủ ngữ của mệnh đề chính.",
    sections: [
      {
        heading: "Mệnh đề phân từ là gì?",
        text:
          "Mệnh đề phân từ là mệnh đề không có chủ ngữ và không có động từ chia thì, bắt đầu bằng một phân từ. Nó thay cho mệnh đề trạng ngữ (because, when, after, if...) hoặc mệnh đề quan hệ, giúp câu gọn hơn. Cấu trúc này phổ biến trong văn viết, báo chí, văn học; trong văn nói người ta thường dùng mệnh đề đầy đủ.",
        examples: [
          { en: "Because she felt tired, she went to bed early. → Feeling tired, she went to bed early.", vi: "Vì cảm thấy mệt, cô ấy đi ngủ sớm." },
          { en: "After I had finished my homework, I went out. → Having finished my homework, I went out.", vi: "Làm xong bài tập, tôi đi ra ngoài." },
        ],
      },
      {
        heading: "Các dạng phân từ",
        formulas: [
          { label: "V-ing (chủ động, đồng thời/lý do)", pattern: "V-ing ..., S + V ..." },
          { label: "V3 (bị động)", pattern: "V3 ..., S + V ..." },
          { label: "Having + V3 (chủ động, xảy ra trước)", pattern: "Having + V3 ..., S + V ..." },
          { label: "Having been + V3 (bị động, xảy ra trước)", pattern: "Having been + V3 ..., S + V ..." },
          { label: "Phủ định", pattern: "Not + V-ing ... / Not having + V3 ..." },
        ],
        examples: [
          { en: "Walking down the street, I saw an old friend.", vi: "Đang đi bộ trên phố thì tôi gặp một người bạn cũ." },
          { en: "Written in 1850, the novel is still popular today.", vi: "Được viết năm 1850, cuốn tiểu thuyết đến nay vẫn được ưa chuộng." },
          { en: "Having lived in Japan for years, he speaks Japanese fluently.", vi: "Vì đã sống ở Nhật nhiều năm, anh ấy nói tiếng Nhật trôi chảy." },
          { en: "Having been warned about the storm, we stayed indoors.", vi: "Vì đã được cảnh báo về cơn bão, chúng tôi ở trong nhà." },
          { en: "Not knowing what to do, she called her mother.", vi: "Không biết phải làm gì, cô ấy gọi cho mẹ." },
          { en: "Not having received a reply, I sent another email.", vi: "Vì chưa nhận được hồi âm, tôi gửi thêm một email nữa." },
        ],
      },
      {
        heading: "Phân từ sau liên từ và mệnh đề quan hệ rút gọn",
        points: [
          "Có thể giữ liên từ để nghĩa rõ hơn: after/before/since/while/when + V-ing: After finishing the report, she went home. While driving, you shouldn't use your phone.",
          "when/if/once/unless/until + V3 (bị động): When asked about the scandal, the minister refused to comment. Once opened, the jar should be kept in the fridge.",
          "Rút gọn mệnh đề quan hệ: V-ing thay cho mệnh đề chủ động, V3 thay cho mệnh đề bị động: The woman sitting next to me (= who was sitting...). The car stolen last week (= which was stolen...) has been found.",
        ],
        examples: [
          { en: "When asked about his plans, he simply smiled.", vi: "Khi được hỏi về kế hoạch, anh ấy chỉ mỉm cười." },
          { en: "Anyone wanting to join the club should contact Mr Lee.", vi: "Ai muốn tham gia câu lạc bộ thì liên hệ thầy Lee." },
        ],
      },
      {
        heading: "With / Without + O + V-ing / V3",
        text:
          "Cấu trúc này có chủ ngữ riêng (O) cho phân từ, dùng để mô tả hoàn cảnh hoặc lý do đi kèm. V-ing khi O chủ động thực hiện hành động; V3 khi O chịu tác động.",
        formulas: [
          { label: "Chủ động", pattern: "With/Without + O + V-ing ..., S + V ..." },
          { label: "Bị động", pattern: "With/Without + O + V3 ..., S + V ..." },
        ],
        examples: [
          { en: "With prices rising so fast, many families are struggling.", vi: "Với việc giá cả tăng quá nhanh, nhiều gia đình đang chật vật." },
          { en: "He sat in silence with his arms folded.", vi: "Anh ấy ngồi im lặng, khoanh tay." },
          { en: "Without anyone noticing, she slipped out of the room.", vi: "Không ai để ý, cô ấy lẻn ra khỏi phòng." },
          { en: "With the work finished, we could finally relax.", vi: "Khi công việc đã xong, cuối cùng chúng tôi cũng được nghỉ ngơi." },
        ],
      },
      {
        heading: "Lỗi phân từ treo (dangling participle)",
        text:
          "Chủ ngữ ngầm của phân từ PHẢI trùng với chủ ngữ của mệnh đề chính. Nếu không, câu trở nên sai hoặc buồn cười.",
        examples: [
          { en: "✗ Walking into the room, the lights went out.", vi: "Câu sai: nghe như \"đèn\" đi vào phòng." },
          { en: "✓ As I walked into the room, the lights went out.", vi: "Khi tôi bước vào phòng thì đèn tắt." },
          { en: "✓ Walking into the room, I noticed that the lights were off.", vi: "Bước vào phòng, tôi nhận thấy đèn đã tắt." },
        ],
        points: [
          "Ngoại lệ: một số cụm cố định được chấp nhận dù không trùng chủ ngữ: generally speaking, judging by/from, considering, broadly speaking, taking everything into account.",
          "Ví dụ: Judging by his accent, he must be from Scotland. Considering the weather, the turnout was good.",
        ],
      },
      {
        heading: "Bảng tổng hợp",
        table: {
          head: ["Dạng", "Nghĩa", "Ví dụ"],
          rows: [
            ["V-ing", "Chủ động, cùng lúc hoặc lý do", "Feeling hungry, I made a sandwich."],
            ["V3", "Bị động", "Built in 1900, the bridge needs repairs."],
            ["Having + V3", "Chủ động, xảy ra trước", "Having eaten, we left."],
            ["Having been + V3", "Bị động, xảy ra trước", "Having been told off, he apologised."],
            ["Not + V-ing", "Phủ định", "Not wanting to wake her, I left quietly."],
            ["With + O + V-ing/V3", "Hoàn cảnh đi kèm", "With the baby sleeping, we whispered."],
          ],
        },
      },
    ],
    mistakes: [
      {
        wrong: "Having finished the report, the computer was switched off.",
        right: "Having finished the report, I switched off the computer.",
        why: "Lỗi phân từ treo: người hoàn thành báo cáo là \"I\", nên chủ ngữ mệnh đề chính phải là I, không phải the computer.",
      },
      {
        wrong: "Writing in 1850, the novel is still popular.",
        right: "Written in 1850, the novel is still popular.",
        why: "Cuốn tiểu thuyết \"được viết\" → nghĩa bị động → dùng V3 (Written).",
      },
      {
        wrong: "Finished my homework, I went out.",
        right: "Having finished my homework, I went out.",
        why: "Hành động chủ động xảy ra trước → Having + V3. V3 đứng một mình mang nghĩa bị động.",
      },
      {
        wrong: "Don't knowing what to say, he kept silent.",
        right: "Not knowing what to say, he kept silent.",
        why: "Phủ định của phân từ là Not + V-ing, không dùng don't.",
      },
      {
        wrong: "Having been finished the work, he left.",
        right: "Having finished the work, he left.",
        why: "Anh ấy chủ động làm xong việc → Having + V3. Having been + V3 chỉ dùng cho nghĩa bị động.",
      },
    ],
    exercises: [
      {
        kind: "choice",
        question: "___ by the noise, the baby started crying.",
        options: ["Waking", "Woken", "Having woken", "Wake"],
        answer: 1,
        explain:
          "Em bé \"bị đánh thức\" bởi tiếng ồn → nghĩa bị động → V3: Woken. \"Having woken\" là chủ động (đã thức dậy/đã đánh thức ai) nên không đi với \"by the noise\".",
      },
      {
        kind: "choice",
        question: "___ all the documents carefully, she signed the contract.",
        options: ["Read", "Having been read", "Having read", "Been reading"],
        answer: 2,
        explain:
          "Cô ấy chủ động đọc tài liệu TRƯỚC khi ký → Having + V3: Having read. \"Having been read\" là bị động (tài liệu được đọc), không hợp với chủ ngữ she.",
      },
      {
        kind: "choice",
        question: "___ what to say, he remained silent.",
        options: ["Not knowing", "Knowing not", "Don't know", "Not known"],
        answer: 0,
        explain: "Phủ định của phân từ chủ động: Not + V-ing → Not knowing.",
      },
      {
        kind: "choice",
        question: "With the deadline ___, everyone was working late.",
        options: ["approached", "to approach", "approach", "approaching"],
        answer: 3,
        explain: "With + O + V-ing khi O (the deadline) chủ động \"đang đến gần\" → approaching.",
      },
      {
        kind: "choice",
        question: "___ in Germany, these cars are known for their reliability.",
        options: ["Making", "Having made", "Made", "Make"],
        answer: 2,
        explain: "Xe hơi \"được sản xuất\" ở Đức → nghĩa bị động → V3: Made. Making/Having made là chủ động.",
      },
      {
        kind: "fill",
        question: "___ in the army for ten years, he found civilian life difficult.",
        answers: ["Having served"],
        hint: "serve",
        explain: "Hành động chủ động kéo dài và đã hoàn tất TRƯỚC hành động chính → Having + V3: Having served.",
      },
      {
        kind: "fill",
        question: "___ twice for the job, she decided not to apply again.",
        answers: ["Having been rejected", "Rejected"],
        hint: "reject",
        explain:
          "Cô ấy \"bị từ chối\" (bị động) và việc đó xảy ra trước → Having been rejected. Dạng rút gọn Rejected cũng đúng vì V3 đã mang nghĩa bị động.",
      },
      {
        kind: "fill",
        question: "He sat in the corner with his arms ___.",
        answers: ["folded"],
        hint: "fold",
        explain: "With + O + V3: cánh tay \"được khoanh lại\" (trạng thái bị động) → folded.",
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // 6. Emphasis
  // ---------------------------------------------------------------------------
  {
    id: "c1-emphasis",
    level: "C1",
    title: "Các cách nhấn mạnh",
    titleEn: "Emphasis",
    summary:
      "Học các công cụ nhấn mạnh trong tiếng Anh: trợ động từ do/does/did, so ... that và such ... that, đảo ngữ với So và Such, cùng các từ nhấn mạnh như the very, at all, whatsoever và đại từ phản thân.",
    sections: [
      {
        heading: "Tổng quan",
        text:
          "Ngoài câu chẻ và đảo ngữ, tiếng Anh có nhiều cách khác để nhấn mạnh: thêm trợ động từ, dùng cấu trúc so/such ... that, đảo So/Such lên đầu câu, hoặc dùng những từ nhấn mạnh đặc biệt. Mỗi cách có sắc thái và mức độ trang trọng khác nhau.",
      },
      {
        heading: "Trợ động từ nhấn mạnh: do / does / did + V",
        text:
          "Thêm do/does/did trước động từ nguyên mẫu trong câu khẳng định (hiện tại đơn, quá khứ đơn) để nhấn mạnh, khẳng định trái với điều người kia nghĩ, hoặc tạo sự đối lập. Khi nói, trợ động từ được nhấn giọng.",
        formulas: [
          { label: "Hiện tại đơn", pattern: "S + do/does + V ..." },
          { label: "Quá khứ đơn", pattern: "S + did + V ..." },
          { label: "Câu mệnh lệnh (lịch sự, mời mọc)", pattern: "Do + V ..." },
        ],
        examples: [
          { en: "I do like your new haircut!", vi: "Mình thật sự thích kiểu tóc mới của bạn!" },
          { en: "She did tell me about the meeting, but I forgot.", vi: "Cô ấy CÓ nói với tôi về cuộc họp, nhưng tôi quên mất." },
          { en: "He doesn't play football, but he does play tennis.", vi: "Anh ấy không chơi bóng đá, nhưng anh ấy CÓ chơi quần vợt." },
          { en: "Do sit down and make yourself comfortable.", vi: "Mời bạn ngồi và cứ tự nhiên nhé.", note: "Hơi trang trọng, thường gặp trong Anh-Anh." },
        ],
      },
      {
        heading: "so ... that và such ... that",
        formulas: [
          { label: "so + tính từ/trạng từ", pattern: "S + V + so + adj/adv + that + S + V" },
          { label: "so + many/much/few/little", pattern: "so + many/few + N số nhiều / so + much/little + N không đếm được + that ..." },
          { label: "such + danh từ số ít", pattern: "such + a/an + (adj) + N đếm được số ít + that ..." },
          { label: "such + danh từ số nhiều/không đếm được", pattern: "such + (adj) + N số nhiều/không đếm được + that ..." },
        ],
        examples: [
          { en: "The film was so boring that I fell asleep.", vi: "Bộ phim chán đến mức tôi ngủ gật." },
          { en: "She spoke so quietly that nobody heard her.", vi: "Cô ấy nói nhỏ đến mức không ai nghe thấy." },
          { en: "It was such a boring film that I fell asleep.", vi: "Đó là một bộ phim chán đến nỗi tôi ngủ gật." },
          { en: "They are such kind people that everyone loves them.", vi: "Họ là những người tốt bụng đến mức ai cũng quý." },
          { en: "There were so many people that we couldn't get in.", vi: "Đông người đến mức chúng tôi không vào được." },
        ],
        points: [
          "\"that\" thường được lược bỏ trong văn nói: It was so cold (that) we stayed in.",
          "Trong văn trang trọng còn có dạng so + adj + a/an + N: It was so beautiful a day that we went to the beach. (= such a beautiful day)",
        ],
      },
      {
        heading: "Đảo ngữ với So và Such (trang trọng)",
        formulas: [
          { label: "So + adj + be", pattern: "So + adj + be + S + that + S + V" },
          { label: "So + adv + aux", pattern: "So + adv + aux + S + V + that + S + V" },
          { label: "Such + be", pattern: "Such + be + N + that + S + V" },
        ],
        points: [
          "\"Such\" đầu câu mang nghĩa \"lớn/mạnh đến mức\" (= so great): Such was the demand that... = The demand was so great that...",
          "Cấu trúc này mang tính văn viết, văn chương; hãy dùng trong bài luận hoặc văn kể chuyện trang trọng.",
        ],
        examples: [
          { en: "So strong was the wind that several trees fell down.", vi: "Gió mạnh đến nỗi vài cây bị đổ." },
          { en: "So quickly did he run that nobody could catch him.", vi: "Anh ta chạy nhanh đến mức không ai đuổi kịp." },
          { en: "Such was the demand for tickets that the website crashed.", vi: "Nhu cầu mua vé lớn đến mức trang web bị sập." },
        ],
      },
      {
        heading: "Từ nhấn mạnh: the very, at all, whatsoever, đại từ phản thân",
        points: [
          "the very + N = chính, đúng là: This is the very book I was looking for. / at the very beginning (ngay từ đầu).",
          "at all trong câu phủ định và câu hỏi: I don't like it at all. Do you know him at all?",
          "whatever / whatsoever sau no/any + N (rất mạnh): There is no evidence whatsoever. I have no doubt whatever. (whatsoever phổ biến hơn).",
          "Đại từ phản thân nhấn mạnh (myself, himself, herself...): The president himself attended the ceremony. I fixed it myself.",
        ],
        examples: [
          { en: "She left at the very moment I arrived.", vi: "Cô ấy rời đi đúng vào lúc tôi vừa đến." },
          { en: "I didn't enjoy the trip at all.", vi: "Tôi chẳng thích chuyến đi chút nào." },
          { en: "He has no interest whatsoever in politics.", vi: "Anh ấy hoàn toàn không có hứng thú gì với chính trị." },
          { en: "The CEO herself answered my email.", vi: "Chính bà giám đốc điều hành đã trả lời email của tôi." },
        ],
      },
      {
        heading: "Bảng so sánh so và such",
        table: {
          head: ["Cấu trúc", "Đi với", "Ví dụ"],
          rows: [
            ["so", "tính từ / trạng từ", "so tired, so fast"],
            ["so", "many/few + N số nhiều; much/little + N không đếm được", "so many cars, so little time"],
            ["such a/an", "(adj) + N đếm được số ít", "such a mess, such an easy test"],
            ["such", "(adj) + N số nhiều / không đếm được", "such nice people, such bad weather"],
            ["So ... (đảo ngữ)", "adj + be + S / adv + aux + S", "So tired was she that..."],
            ["Such ... (đảo ngữ)", "be + N", "Such was his anger that..."],
          ],
        },
      },
    ],
    mistakes: [
      {
        wrong: "It was so a good film that I watched it twice.",
        right: "It was such a good film that I watched it twice.",
        why: "Trước a/an + adj + N dùng such, không dùng so.",
      },
      {
        wrong: "She is such kind that everyone likes her.",
        right: "She is so kind that everyone likes her.",
        why: "Trước tính từ đứng một mình (không có danh từ) dùng so.",
      },
      {
        wrong: "I did went to the meeting.",
        right: "I did go to the meeting.",
        why: "Sau trợ động từ nhấn mạnh did, động từ chính ở dạng nguyên mẫu.",
      },
      {
        wrong: "So tired she was that she fell asleep at her desk.",
        right: "So tired was she that she fell asleep at her desk.",
        why: "So + adj đứng đầu câu thì phải đảo động từ be lên trước chủ ngữ.",
      },
      {
        wrong: "There were so much people that we couldn't move.",
        right: "There were so many people that we couldn't move.",
        why: "people là danh từ đếm được số nhiều nên dùng so many, không dùng so much.",
      },
    ],
    exercises: [
      {
        kind: "choice",
        question: "It was ___ interesting lecture that nobody left early.",
        options: ["so", "such", "such an", "so an"],
        answer: 2,
        explain: "Danh từ đếm được số ít (lecture) có tính từ bắt đầu bằng nguyên âm → such an + adj + N.",
      },
      {
        kind: "choice",
        question: "___ was the noise that we couldn't hear each other.",
        options: ["So", "Such", "So much", "Too"],
        answer: 1,
        explain:
          "Such + be + N + that (Such = lớn đến mức). \"So\" chỉ đứng đầu khi theo sau là tính từ/trạng từ (So loud was the noise...).",
      },
      {
        kind: "choice",
        question: "So quickly ___ that nobody could catch him.",
        options: ["he ran", "ran he", "did he run", "he did run"],
        answer: 2,
        explain: "So + adv đứng đầu câu → đảo ngữ với trợ động từ. Quá khứ đơn nên dùng did + S + V: did he run.",
      },
      {
        kind: "choice",
        question: "There is no evidence ___ to support his claim.",
        options: ["whatsoever", "very", "ever", "much"],
        answer: 0,
        explain: "whatsoever đứng sau no + N để nhấn mạnh phủ định tuyệt đối: no evidence whatsoever.",
      },
      {
        kind: "choice",
        question: "I know you think I forgot, but I ___ the email yesterday.",
        options: ["did sent", "do send", "was send", "did send"],
        answer: 3,
        explain:
          "Nhấn mạnh trái với điều người kia nghĩ, ở quá khứ → did + V nguyên mẫu: did send. \"did sent\" sai vì sau did phải là nguyên mẫu.",
      },
      {
        kind: "fill",
        question: "She spoke ___ quietly that I could hardly hear her.",
        answers: ["so"],
        hint: "so / such",
        explain: "Trước trạng từ (quietly) dùng so: so + adv + that.",
      },
      {
        kind: "fill",
        question: "___ the force of the storm that all flights were cancelled.",
        answers: ["Such was"],
        hint: "such / be",
        explain: "Đảo ngữ Such + be + N + that. Câu ở quá khứ (were cancelled) và chủ ngữ the force số ít → Such was.",
      },
      {
        kind: "fill",
        question: "This is ___ book I've been looking for all week!",
        answers: ["the very"],
        hint: "the / very",
        explain: "the very + N = chính là, đúng là cái đó: the very book.",
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // 7. Ellipsis and substitution
  // ---------------------------------------------------------------------------
  {
    id: "c1-ellipsis-substitution",
    level: "C1",
    title: "Tỉnh lược và thay thế",
    titleEn: "Ellipsis and substitution",
    summary:
      "Học cách tránh lặp từ bằng cách thay thế (so, not, do so, one/ones) và tỉnh lược (bỏ bớt từ đã rõ nghĩa): I think so, I hope not, So do I, Neither do I, I'd like to, câu trả lời ngắn và mệnh đề so sánh.",
    sections: [
      {
        heading: "Tỉnh lược và thay thế là gì?",
        text:
          "Người bản xứ rất ít khi lặp lại nguyên văn những gì vừa nói. Thay vào đó, họ thay thế một cụm từ bằng một từ ngắn (thay thế — substitution) hoặc bỏ hẳn phần đã rõ nghĩa (tỉnh lược — ellipsis). Nắm được điều này giúp bạn nói tự nhiên hơn và hiểu đúng các câu \"bị thiếu\" khi nghe, đọc.",
        examples: [
          { en: "A: Is she coming? B: I think so. (= I think she is coming.)", vi: "A: Cô ấy có đến không? B: Tôi nghĩ là có." },
          { en: "I can't help you, but Tom can. (= Tom can help you.)", vi: "Tôi không giúp bạn được, nhưng Tom thì giúp được." },
        ],
      },
      {
        heading: "Thay thế mệnh đề bằng so / not",
        text:
          "Sau các động từ think, hope, believe, suppose, expect, imagine, guess, be afraid, ta dùng \"so\" thay cho mệnh đề khẳng định và \"not\" thay cho mệnh đề phủ định.",
        formulas: [
          { label: "Khẳng định", pattern: "S + think/hope/believe/suppose/expect/be afraid + so" },
          { label: "Phủ định (cách 1)", pattern: "S + don't think/believe/suppose/expect + so" },
          { label: "Phủ định (cách 2)", pattern: "S + hope/be afraid/guess + not" },
          { label: "Mệnh đề điều kiện", pattern: "If so, ... / If not, ..." },
        ],
        points: [
          "Với think, believe, suppose, expect: phủ định thường dùng \"I don't think so\"; \"I think not\" có nhưng rất trang trọng.",
          "Với hope và be afraid: CHỈ dùng \"I hope not\", \"I'm afraid not\". Không nói \"I don't hope so\".",
          "Không dùng \"it\" thay cho mệnh đề: I think so (không phải I think it).",
        ],
        examples: [
          { en: "A: Will it rain tomorrow? B: I hope not.", vi: "A: Mai trời có mưa không? B: Hy vọng là không." },
          { en: "A: Did we lose? B: I'm afraid so.", vi: "A: Chúng ta thua à? B: E là vậy." },
          { en: "A: Is the shop open on Sundays? B: I don't think so.", vi: "A: Cửa hàng có mở cửa Chủ nhật không? B: Tôi nghĩ là không." },
          { en: "Are you free tonight? If so, let's have dinner.", vi: "Tối nay bạn rảnh không? Nếu rảnh thì đi ăn tối nhé." },
        ],
      },
      {
        heading: "Thay thế động từ: do / do so; thay thế danh từ: one / ones",
        points: [
          "do / does / did thay cho cả cụm động từ đã nhắc: She said she would call, and she did.",
          "do so trang trọng hơn, dùng cho hành động có chủ ý: He was asked to leave, and he did so immediately.",
          "Trong Anh-Anh, sau trợ động từ khuyết thiếu có thể thêm \"do\": A: Will you be there? B: I might (do). Anh-Mỹ thường không thêm.",
          "one (số ít) / ones (số nhiều) thay cho danh từ ĐẾM ĐƯỢC đã nhắc: I don't like the red shirt; I prefer the blue one. These shoes are too small; I need bigger ones.",
          "Không dùng one/ones cho danh từ không đếm được; hãy dùng some/any hoặc bỏ danh từ: I need some advice — can you give me some?",
          "Với \"a\" + one, cần có tính từ đi kèm: I want a car — a fast one. (không nói I want a one.)",
        ],
        examples: [
          { en: "I told him to apologise, and he did.", vi: "Tôi bảo anh ấy xin lỗi, và anh ấy đã làm vậy." },
          { en: "Which cake would you like — the chocolate one or the lemon one?", vi: "Bạn muốn bánh nào — bánh sô-cô-la hay bánh chanh?" },
        ],
      },
      {
        heading: "So do I / Neither do I và các trợ động từ khác",
        formulas: [
          { label: "Đồng ý câu khẳng định", pattern: "So + aux + S" },
          { label: "Đồng ý câu phủ định", pattern: "Neither/Nor + aux + S" },
          { label: "Thân mật", pattern: "Me too / Me neither" },
          { label: "Khác ý", pattern: "S + aux (+ not)" },
        ],
        points: [
          "Trợ động từ phải khớp với câu gốc: be → am/is/are/was/were; thì đơn → do/does/did; have, can, will... giữ nguyên.",
          "Neither/Nor + aux khẳng định (không thêm not): Neither do I (không phải Neither don't I).",
          "Phân biệt: \"So it is!\" (S + aux) = xác nhận điều vừa nghe là đúng/bất ngờ, không phải \"tôi cũng vậy\".",
        ],
        examples: [
          { en: "A: I love jazz. B: So do I.", vi: "A: Tôi mê nhạc jazz. B: Tôi cũng vậy." },
          { en: "A: I haven't seen that film. B: Neither have I.", vi: "A: Tôi chưa xem phim đó. B: Tôi cũng chưa." },
          { en: "A: I can't swim. B: I can.", vi: "A: Tôi không biết bơi. B: Tôi thì biết." },
          { en: "My sister lives abroad, and so does my brother.", vi: "Chị tôi sống ở nước ngoài, anh tôi cũng vậy." },
        ],
      },
      {
        heading: "Tỉnh lược sau to, trong câu so sánh và câu trả lời ngắn",
        points: [
          "Giữ lại \"to\" thay cho cả cụm động từ: A: Would you like to come? B: Yes, I'd love to. I didn't want to go, but I had to.",
          "Sau want và like trong mệnh đề if/when/whatever..., \"to\" thường được bỏ: Come whenever you like. You can leave if you want (to).",
          "Trong so sánh, dùng trợ động từ thay cho phần lặp lại: She runs faster than I do. He earns more than he did last year. (\"than me\" phổ biến trong văn nói thân mật.)",
          "Câu trả lời ngắn và câu nối dùng trợ động từ: A: Have you finished? B: Yes, I have. I can't help you, but Tom can.",
        ],
        examples: [
          { en: "A: Are you coming to the party? B: I'd like to, but I can't.", vi: "A: Bạn có đến bữa tiệc không? B: Mình muốn lắm, nhưng không đi được." },
          { en: "The test was easier than I expected (it to be).", vi: "Bài kiểm tra dễ hơn tôi nghĩ." },
          { en: "She has been to Japan, and so has her husband.", vi: "Cô ấy đã đến Nhật, chồng cô ấy cũng vậy." },
        ],
      },
      {
        heading: "Bảng tổng hợp",
        table: {
          head: ["Thay cho", "Dùng", "Ví dụ"],
          rows: [
            ["Mệnh đề khẳng định", "so", "I think so. / I'm afraid so."],
            ["Mệnh đề phủ định", "not / don't ... so", "I hope not. / I don't think so."],
            ["Cụm động từ", "do / did / do so", "He promised to help, and he did."],
            ["Danh từ đếm được", "one / ones", "the blue one, the old ones"],
            ["\"Tôi cũng vậy\" (khẳng định)", "So + aux + S", "So do I. / So can she."],
            ["\"Tôi cũng không\" (phủ định)", "Neither/Nor + aux + S", "Neither did we."],
            ["Cụm to + V", "to", "I'd love to."],
          ],
        },
      },
    ],
    mistakes: [
      {
        wrong: "A: Will it rain? B: I don't hope so.",
        right: "A: Will it rain? B: I hope not.",
        why: "Với hope, phủ định là \"I hope not\"; không nói \"I don't hope so\".",
      },
      {
        wrong: "A: Is he coming? B: I think it.",
        right: "A: Is he coming? B: I think so.",
        why: "Dùng \"so\" (không dùng \"it\") để thay cho cả mệnh đề sau think, hope, believe...",
      },
      {
        wrong: "A: I don't like coffee. B: So do I.",
        right: "A: I don't like coffee. B: Neither do I. / Nor do I.",
        why: "Đồng ý với câu phủ định phải dùng Neither/Nor + aux + S.",
      },
      {
        wrong: "A: Would you like to join us? B: Yes, I'd like.",
        right: "A: Would you like to join us? B: Yes, I'd like to.",
        why: "Sau would like/love/want phải giữ lại \"to\" để thay cho cụm động từ.",
      },
      {
        wrong: "I need some information. Can you give me one?",
        right: "I need some information. Can you give me some?",
        why: "information không đếm được nên không thay bằng one; dùng some/any.",
      },
    ],
    exercises: [
      {
        kind: "choice",
        question: "A: Will it rain tomorrow? B: I hope ___. I want to go to the beach.",
        options: ["so", "not", "no", "it"],
        answer: 1,
        explain: "Người nói muốn đi biển nên hy vọng trời KHÔNG mưa → I hope not.",
      },
      {
        kind: "choice",
        question: "A: I haven't seen that film yet. B: ___. Let's watch it together.",
        options: ["So have I", "Neither I have", "Neither have I", "Nor I haven't"],
        answer: 2,
        explain: "Đồng ý với câu phủ định ở hiện tại hoàn thành → Neither + have + I. Không đảo thì sai; không thêm not sau Neither/Nor.",
      },
      {
        kind: "choice",
        question: "These glasses are dirty. Could you bring me some clean ___?",
        options: ["one", "ones", "glass", "it"],
        answer: 1,
        explain: "Thay cho danh từ đếm được số nhiều (glasses) → ones.",
      },
      {
        kind: "choice",
        question: "He promised to fix the roof, but he never ___.",
        options: ["made", "was", "does", "did"],
        answer: 3,
        explain: "did thay cho cụm \"fixed the roof\" ở quá khứ (promised). \"does\" sai thì; made/was không thay được cụm động từ.",
      },
      {
        kind: "choice",
        question: "A: Do you think she'll pass? B: I'm afraid ___. She hasn't studied at all.",
        options: ["not", "so", "no", "neither"],
        answer: 0,
        explain:
          "Cô ấy không học gì nên người nói e là cô ấy sẽ KHÔNG đỗ → I'm afraid not. \"I'm afraid so\" nghĩa là \"e là cô ấy sẽ đỗ\", mâu thuẫn với ngữ cảnh.",
      },
      {
        kind: "fill",
        question: "My sister speaks French fluently, and so ___ my brother.",
        answers: ["does"],
        hint: "do",
        explain: "So + aux + S. Câu gốc ở hiện tại đơn, chủ ngữ my brother số ít → so does my brother.",
      },
      {
        kind: "fill",
        question: "A: Is the museum open on Mondays? B: I don't think ___.",
        answers: ["so"],
        hint: "so / not",
        explain: "Phủ định với think thường dùng \"I don't think so\".",
      },
      {
        kind: "fill",
        question: "She earns much more now than she ___ five years ago.",
        answers: ["did"],
        hint: "do",
        explain: "Trong so sánh, dùng trợ động từ thay cho \"earned\" ở quá khứ (five years ago) → did.",
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // 8. Academic style
  // ---------------------------------------------------------------------------
  {
    id: "c1-academic-style",
    level: "C1",
    title: "Văn phong học thuật",
    titleEn: "Academic style",
    summary:
      "Học những đặc điểm ngữ pháp của văn phong học thuật: danh từ hoá, cấu trúc bị động không ngôi (It is widely believed that...), cách nói giảm, rào đón (hedging) và các từ nối trang trọng.",
    sections: [
      {
        heading: "Đặc điểm của văn phong học thuật",
        text:
          "Bài luận, báo cáo, bài nghiên cứu và bài thi viết (IELTS, Cambridge C1) đòi hỏi văn phong khách quan, chính xác, súc tích và thận trọng.",
        points: [
          "Khách quan: hạn chế I/you, dùng cấu trúc không ngôi và bị động.",
          "Súc tích: dùng danh từ hoá để gói nhiều thông tin trong một cụm danh từ.",
          "Thận trọng: không khẳng định quá mức; dùng hedging khi bằng chứng chưa chắc chắn.",
          "Trang trọng: tránh viết tắt (don't → do not), tránh từ lóng, dùng từ nối trang trọng.",
        ],
      },
      {
        heading: "Danh từ hoá (nominalisation)",
        text:
          "Danh từ hoá là biến động từ hoặc tính từ thành danh từ, từ đó biến cả mệnh đề thành một cụm danh từ. Câu văn trở nên gọn và trừu tượng hơn.",
        table: {
          head: ["Động từ / Tính từ", "Danh từ"],
          rows: [
            ["decide", "decision"],
            ["analyse", "analysis"],
            ["fail", "failure"],
            ["rise / increase", "a rise / an increase (in)"],
            ["reduce", "reduction (in)"],
            ["develop", "development"],
            ["important", "importance"],
            ["able", "ability"],
          ],
        },
        examples: [
          { en: "Because prices rose sharply, sales fell. → The sharp rise in prices led to a fall in sales.", vi: "Giá tăng mạnh đã dẫn đến doanh số giảm." },
          { en: "The government decided to raise taxes, which angered many people. → The government's decision to raise taxes angered many people.", vi: "Quyết định tăng thuế của chính phủ khiến nhiều người tức giận." },
          { en: "If we analyse the data carefully, we can see a clear trend. → Careful analysis of the data reveals a clear trend.", vi: "Phân tích dữ liệu cẩn thận cho thấy một xu hướng rõ ràng." },
        ],
        points: [
          "Lưu ý: danh từ hoá quá nhiều làm câu nặng nề, khó đọc. Hãy kết hợp với động từ mạnh (lead to, result in, reveal, cause).",
        ],
      },
      {
        heading: "Bị động không ngôi (impersonal passive)",
        text:
          "Dùng để trình bày ý kiến, thông tin chung mà không cần nêu ai nói, giúp văn bản khách quan hơn. Thường dùng với believe, think, say, report, estimate, consider, know, expect, argue.",
        formulas: [
          { label: "It + bị động + that", pattern: "It is + V3 (believed/said/thought...) + that + S + V" },
          { label: "S + bị động + to V (cùng lúc/tương lai)", pattern: "S + be + V3 + to + V" },
          { label: "S + bị động + to have V3 (xảy ra trước)", pattern: "S + be + V3 + to have + V3" },
          { label: "There", pattern: "There + be + V3 + to be + N" },
        ],
        examples: [
          { en: "It is widely believed that exercise reduces stress.", vi: "Nhiều người tin rằng tập thể dục giúp giảm căng thẳng." },
          { en: "It is estimated that over 2 million people visited the exhibition.", vi: "Ước tính có hơn 2 triệu người đã đến xem triển lãm." },
          { en: "The economy is expected to grow by 3% next year.", vi: "Nền kinh tế được dự báo sẽ tăng trưởng 3% vào năm tới." },
          { en: "The suspect is said to have left the country.", vi: "Nghi phạm được cho là đã rời khỏi đất nước." },
          { en: "There are thought to be fewer than 500 of these animals left.", vi: "Người ta cho rằng chỉ còn chưa đến 500 cá thể loài vật này." },
        ],
      },
      {
        heading: "Hedging — nói giảm, rào đón",
        text:
          "Trong học thuật, người viết tránh khẳng định tuyệt đối khi chưa đủ bằng chứng. Các công cụ hedging giúp lập luận chính xác và thận trọng hơn.",
        points: [
          "Động từ khuyết thiếu: may, might, could (This may explain...).",
          "Động từ: tend to, appear to, seem to, suggest, indicate (Women tend to live longer than men. The results suggest that...).",
          "Tính từ/trạng từ: likely, possible, arguably, possibly, probably, apparently, largely.",
          "\"likely\" chủ yếu là tính từ: It is likely that... / X is likely to... Trong Anh-Mỹ, \"likely\" còn được dùng như trạng từ (will likely), nhưng trong văn viết Anh-Anh nên dùng probably.",
          "Cụm từ: it could be argued that, to some extent, in most cases, there is some evidence that.",
        ],
        examples: [
          { en: "This proves that social media causes depression. → These findings suggest that social media may contribute to depression.", vi: "Những phát hiện này cho thấy mạng xã hội có thể góp phần gây ra trầm cảm." },
          { en: "Online learning appears to be less effective for younger children.", vi: "Học trực tuyến có vẻ kém hiệu quả hơn đối với trẻ nhỏ." },
          { en: "It could be argued that the policy was introduced too quickly.", vi: "Có thể lập luận rằng chính sách đã được đưa ra quá vội vàng." },
          { en: "Prices are likely to rise further in the coming months.", vi: "Giá cả nhiều khả năng sẽ còn tăng trong những tháng tới." },
        ],
      },
      {
        heading: "Từ nối trang trọng",
        table: {
          head: ["Chức năng", "Từ nối", "Cách dùng"],
          rows: [
            ["Bổ sung", "furthermore, moreover, in addition", "Đầu câu, sau đó là dấu phẩy."],
            ["Tương phản (giữa hai câu)", "however, nevertheless, nonetheless", "Đầu câu + dấu phẩy, hoặc sau dấu chấm phẩy: ...; however, ..."],
            ["Tương phản (nối hai mệnh đề)", "whereas, while, although", "Liên từ: S + V, whereas S + V."],
            ["Tương phản + danh từ", "despite, in spite of", "+ N / V-ing (không + mệnh đề)."],
            ["Kết quả", "consequently, therefore, thus, as a result, hence", "Đầu câu + dấu phẩy, hoặc sau dấu chấm phẩy."],
          ],
        },
        examples: [
          { en: "Some students prefer online classes, whereas others find them isolating.", vi: "Một số sinh viên thích học trực tuyến, trong khi những người khác thấy cô lập." },
          { en: "The company lost its biggest client; consequently, it had to cut jobs.", vi: "Công ty mất khách hàng lớn nhất; do đó, họ phải cắt giảm nhân sự." },
          { en: "Despite the rise in costs, the project was completed on time.", vi: "Mặc dù chi phí tăng, dự án vẫn hoàn thành đúng hạn." },
        ],
        points: [
          "However, consequently, therefore là trạng từ liên kết, không phải liên từ: không dùng chúng với dấu phẩy để nối hai mệnh đề (Prices rose, however demand stayed the same ✗). Hãy dùng dấu chấm hoặc dấu chấm phẩy.",
        ],
      },
    ],
    mistakes: [
      {
        wrong: "Despite the economy grew, unemployment rose.",
        right: "Although the economy grew, unemployment rose. / Despite the growth of the economy, unemployment rose.",
        why: "despite + N/V-ing, không đi với mệnh đề; muốn dùng mệnh đề thì đổi sang although.",
      },
      {
        wrong: "It is believed the economy to recover soon.",
        right: "It is believed that the economy will recover soon. / The economy is believed to be recovering.",
        why: "Sau It is believed dùng that + mệnh đề; cấu trúc to V chỉ dùng khi chủ ngữ là danh từ (The economy is believed to...).",
      },
      {
        wrong: "Prices rose, however demand remained stable.",
        right: "Prices rose; however, demand remained stable.",
        why: "however là trạng từ liên kết, không nối hai mệnh đề bằng dấu phẩy; dùng dấu chấm phẩy (hoặc dấu chấm) và dấu phẩy sau however.",
      },
      {
        wrong: "He is said to leave the country last year.",
        right: "He is said to have left the country last year.",
        why: "Hành động xảy ra trước thời điểm \"được nói\" (last year) → to have + V3.",
      },
      {
        wrong: "This proves that video games cause violence.",
        right: "This suggests that video games may contribute to violent behaviour.",
        why: "Văn học thuật cần thận trọng; khẳng định tuyệt đối (proves, cause) khi chưa đủ bằng chứng là lỗi về văn phong.",
      },
    ],
    exercises: [
      {
        kind: "choice",
        question: "It is widely ___ that regular exercise reduces stress.",
        options: ["believing", "believe", "believed", "to believe"],
        answer: 2,
        explain: "Bị động không ngôi: It is + V3 + that ... → It is widely believed that...",
      },
      {
        kind: "choice",
        question: "The new drug is reported ___ serious side effects in earlier trials.",
        options: ["to cause", "causing", "caused", "to have caused"],
        answer: 3,
        explain:
          "Sự việc xảy ra trước thời điểm đưa tin (in earlier trials) → S + be + V3 + to have + V3: is reported to have caused.",
      },
      {
        kind: "choice",
        question: "The sharp ___ in unemployment has worried economists.",
        options: ["rise", "rose", "rising up", "raise"],
        answer: 0,
        explain:
          "Cần danh từ sau \"The sharp\": a rise in (sự tăng lên của). \"rose\" là động từ quá khứ; \"raise\" là ngoại động từ (danh từ raise trong Anh-Mỹ là tăng lương), không dùng cho unemployment.",
      },
      {
        kind: "choice",
        question: "Some participants preferred online classes, ___ others found them isolating.",
        options: ["furthermore", "whereas", "consequently", "despite"],
        answer: 1,
        explain:
          "Hai mệnh đề đối lập, cần liên từ nối → whereas. furthermore/consequently là trạng từ liên kết (không nối mệnh đề bằng dấu phẩy) và sai nghĩa; despite đi với danh từ.",
      },
      {
        kind: "choice",
        question: "The results ___ that the treatment is effective, but further research is needed.",
        options: ["prove", "show clearly", "guarantee", "suggest"],
        answer: 3,
        explain:
          "Vế sau \"cần nghiên cứu thêm\" cho thấy kết luận chưa chắc chắn → dùng động từ rào đón suggest. prove/guarantee/show clearly khẳng định quá mạnh, mâu thuẫn với vế sau.",
      },
      {
        kind: "fill",
        question: "The committee's ___ to cancel the project surprised everyone.",
        answers: ["decision"],
        hint: "decide",
        explain: "Sau sở hữu cách (The committee's) cần danh từ → danh từ hoá decide → decision.",
      },
      {
        kind: "fill",
        question: "The suspect is thought ___ the country last week.",
        answers: ["to have left"],
        hint: "leave",
        explain: "Hành động (last week) xảy ra trước thời điểm \"được cho là\" → S + be + V3 + to have + V3: to have left.",
      },
      {
        kind: "fill",
        question: "Prices rose sharply. ___, demand for luxury goods fell.",
        answers: ["Consequently"],
        hint: "consequent",
        explain: "Cần trạng từ liên kết chỉ kết quả, đứng đầu câu và có dấu phẩy theo sau → Consequently (do đó).",
      },
    ],
  },
];
