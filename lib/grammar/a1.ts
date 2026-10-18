import type { GrammarTopic } from "./types";

export const A1_TOPICS: GrammarTopic[] = [
  // ---------------------------------------------------------------------------
  // 1. TO BE
  // ---------------------------------------------------------------------------
  {
    id: "a1-to-be",
    level: "A1",
    title: "Động từ “to be” (am / is / are)",
    titleEn: "The verb “to be” (am / is / are)",
    summary:
      "Học cách dùng am / is / are để nói về tên, tuổi, nghề nghiệp, quê quán, tính chất, cảm xúc và vị trí; cách viết câu khẳng định, phủ định, câu hỏi và dạng viết tắt.",
    sections: [
      {
        heading: "“To be” là gì và dùng khi nào?",
        text:
          "“To be” mang nghĩa “là, thì, ở”. Ở thì hiện tại, nó có ba dạng: am, is, are. Tiếng Việt nhiều khi bỏ chữ “là” (“Cô ấy đẹp”), nhưng tiếng Anh bắt buộc phải có động từ trong câu, nên ta phải dùng “to be”.",
        points: [
          "Giới thiệu tên, nghề nghiệp, quốc tịch: I'm Lan. She is a nurse. We are Vietnamese.",
          "Nói tuổi: I'm 20 (years old).",
          "Miêu tả tính chất, cảm xúc, cảm giác: He is tall. I'm hungry. They are happy.",
          "Nói vị trí: The keys are on the table. She is at home.",
          "Nói thời tiết, thời gian: It's cold. It's 7 o'clock.",
        ],
      },
      {
        heading: "Chia “to be” theo chủ ngữ",
        table: {
          head: ["Chủ ngữ", "To be", "Viết tắt", "Ví dụ"],
          rows: [
            ["I", "am", "I'm", "I'm a student."],
            ["He / She / It", "is", "he's / she's / it's", "She's my sister."],
            ["You / We / They", "are", "you're / we're / they're", "They're at school."],
            ["Danh từ số ít (Tom, my mother, the book...)", "is", "Tom's / my mother's", "My mother is a teacher."],
            ["Danh từ số nhiều (my parents, the books...)", "are", "—", "My parents are at work."],
          ],
        },
        points: [
          "“You” dùng cho cả “bạn” (một người) và “các bạn” (nhiều người), nhưng luôn đi với are.",
          "Hai chủ ngữ nối bằng “and” được tính là số nhiều: Lan and I are friends.",
        ],
      },
      {
        heading: "Công thức",
        formulas: [
          { label: "Khẳng định", pattern: "S + am/is/are + danh từ / tính từ / nơi chốn" },
          { label: "Phủ định", pattern: "S + am/is/are + not + ..." },
          { label: "Nghi vấn (Yes/No)", pattern: "Am/Is/Are + S + ...?" },
          { label: "Trả lời ngắn", pattern: "Yes, S + am/is/are. / No, S + am not / isn't / aren't." },
          { label: "Câu hỏi Wh-", pattern: "Wh- + am/is/are + S + ...?" },
        ],
        examples: [
          { en: "I'm a student.", vi: "Tôi là sinh viên." },
          { en: "We are from Vietnam.", vi: "Chúng tôi đến từ Việt Nam." },
          { en: "He isn't at home.", vi: "Anh ấy không có ở nhà." },
          { en: "I'm not tired.", vi: "Tôi không mệt." },
          { en: "Are you hungry? – Yes, I am.", vi: "Bạn có đói không? – Có, tôi đói." },
          { en: "Is your brother a doctor? – No, he isn't.", vi: "Anh trai bạn là bác sĩ à? – Không, anh ấy không phải." },
          { en: "Where are my keys?", vi: "Chìa khóa của tôi đâu rồi?" },
        ],
      },
      {
        heading: "Dạng viết tắt",
        points: [
          "I am → I'm; he is → he's; she is → she's; it is → it's; you/we/they are → you're / we're / they're.",
          "is not → isn't; are not → aren't.",
          "am not KHÔNG có dạng “amn't”: chỉ viết I'm not.",
          "Phủ định có hai cách viết tắt đều đúng: He isn't = He's not; They aren't = They're not.",
          "Trong câu trả lời ngắn khẳng định KHÔNG viết tắt: “Yes, I am.” (không nói “Yes, I'm.”), “Yes, she is.” (không nói “Yes, she's.”).",
        ],
      },
      {
        heading: "Một số cách dùng cần nhớ",
        text:
          "Có những ý tiếng Việt dùng “có” hoặc không có động từ, nhưng tiếng Anh lại dùng “to be”.",
        examples: [
          { en: "I'm 25 years old.", vi: "Tôi 25 tuổi.", note: "Không nói “I have 25 years”." },
          { en: "It's cold today.", vi: "Hôm nay trời lạnh." },
          { en: "She is very beautiful.", vi: "Cô ấy rất đẹp.", note: "Tính từ đứng sau “to be”, không bỏ “is”." },
          { en: "They aren't late.", vi: "Họ không bị trễ." },
          { en: "My name is Nam.", vi: "Tên tôi là Nam." },
        ],
      },
    ],
    mistakes: [
      {
        wrong: "She a teacher.",
        right: "She is a teacher.",
        why: "Tiếng Việt có thể bỏ “là”, nhưng câu tiếng Anh bắt buộc phải có động từ, ở đây là “is”.",
      },
      {
        wrong: "I have 20 years old.",
        right: "I am 20 years old.",
        why: "Nói tuổi dùng “to be”, không dùng “have”.",
      },
      {
        wrong: "I amn't tired.",
        right: "I'm not tired.",
        why: "Không có dạng viết tắt “amn't”; phủ định của “I am” viết tắt là “I'm not”.",
      },
      {
        wrong: "My parents is teachers.",
        right: "My parents are teachers.",
        why: "“My parents” là số nhiều nên dùng “are”.",
      },
      {
        wrong: "I am agree with you.",
        right: "I agree with you.",
        why: "“Agree” là động từ thường nên không dùng thêm “am”. Không đặt “to be” trước động từ thường ở thì hiện tại đơn.",
      },
    ],
    exercises: [
      {
        kind: "choice",
        question: "My sister ___ a doctor.",
        options: ["am", "is", "are"],
        answer: 1,
        explain: "“My sister” là một người (số ít, tương đương “she”) nên dùng “is”.",
      },
      {
        kind: "choice",
        question: "___ you from Hanoi?",
        options: ["Is", "Am", "Are", "Be"],
        answer: 2,
        explain: "Chủ ngữ “you” luôn đi với “are”. Câu hỏi đảo “Are” lên trước chủ ngữ.",
      },
      {
        kind: "choice",
        question: "I ___ hungry now. I just had lunch.",
        options: ["isn't", "aren't", "am not", "not"],
        answer: 2,
        explain: "Chủ ngữ “I” đi với “am”, phủ định là “am not” (viết tắt: I'm not). “isn't” dùng cho he/she/it, “aren't” dùng cho you/we/they.",
      },
      {
        kind: "choice",
        question: "Is Tom your brother? – Yes, ___.",
        options: ["he is", "he's", "is he", "he are"],
        answer: 0,
        explain: "Câu trả lời ngắn khẳng định không viết tắt, nên “Yes, he is” là đúng; “Yes, he's” là sai.",
      },
      {
        kind: "choice",
        question: "The children ___ in the garden.",
        options: ["is", "be", "am", "are"],
        answer: 3,
        explain: "“The children” (bọn trẻ) là danh từ số nhiều nên dùng “are”.",
      },
      {
        kind: "fill",
        question: "We ___ late. The class starts at 9 and it's only 8:30.",
        hint: "not be",
        answers: ["aren't", "are not"],
        explain: "Chủ ngữ “we” đi với “are”; phủ định là “are not” hoặc viết tắt “aren't”.",
      },
      {
        kind: "fill",
        question: "___ it cold outside?",
        hint: "be",
        answers: ["Is"],
        explain: "Chủ ngữ “it” đi với “is”. Câu hỏi Yes/No đưa “Is” lên đầu câu.",
      },
      {
        kind: "fill",
        question: "Lan and I ___ in the same class.",
        hint: "be",
        answers: ["are"],
        explain: "“Lan and I” = “we” (số nhiều), nên dùng “are”, không dùng “am”.",
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // 2. PRONOUNS & POSSESSIVES
  // ---------------------------------------------------------------------------
  {
    id: "a1-pronouns",
    level: "A1",
    title: "Đại từ nhân xưng và sở hữu",
    titleEn: "Pronouns and possessives",
    summary:
      "Phân biệt đại từ chủ ngữ (I, he...), đại từ tân ngữ (me, him...), tính từ sở hữu (my, his...), đại từ sở hữu (mine, his...) và cách dùng sở hữu cách 's.",
    sections: [
      {
        heading: "Bảng tổng hợp",
        text:
          "Tiếng Việt dùng cùng một từ “anh ấy” cho mọi vị trí (“Anh ấy thích tôi”, “Tôi thích anh ấy”, “xe của anh ấy”). Tiếng Anh thì đổi hình thức tùy theo vị trí trong câu.",
        table: {
          head: ["Đại từ chủ ngữ", "Đại từ tân ngữ", "Tính từ sở hữu", "Đại từ sở hữu"],
          rows: [
            ["I (tôi)", "me", "my", "mine"],
            ["you (bạn, các bạn)", "you", "your", "yours"],
            ["he (anh ấy)", "him", "his", "his"],
            ["she (cô ấy)", "her", "her", "hers"],
            ["it (nó – vật, con vật)", "it", "its", "—"],
            ["we (chúng tôi, chúng ta)", "us", "our", "ours"],
            ["they (họ, chúng nó)", "them", "their", "theirs"],
          ],
        },
      },
      {
        heading: "Đại từ chủ ngữ và đại từ tân ngữ",
        points: [
          "Đại từ chủ ngữ đứng trước động từ, làm chủ ngữ: She works here.",
          "Đại từ tân ngữ đứng sau động từ: I love her.",
          "Đại từ tân ngữ cũng đứng sau giới từ (for, with, to, at...): This gift is for them.",
          "“He/him/his” dùng cho nam, “she/her/hers” dùng cho nữ — đừng nhầm theo người nói.",
        ],
        examples: [
          { en: "She loves him, and he loves her.", vi: "Cô ấy yêu anh ấy, và anh ấy yêu cô ấy." },
          { en: "Can you help me?", vi: "Bạn có thể giúp tôi không?" },
          { en: "Look at us!", vi: "Nhìn chúng tôi này!" },
          { en: "I don't know them.", vi: "Tôi không biết họ." },
        ],
      },
      {
        heading: "Tính từ sở hữu và đại từ sở hữu",
        points: [
          "Tính từ sở hữu (my, your, his, her, its, our, their) luôn đứng TRƯỚC một danh từ: my bag, their house.",
          "Đại từ sở hữu (mine, yours, his, hers, ours, theirs) đứng MỘT MÌNH, thay cho “tính từ sở hữu + danh từ”: This bag is mine (= my bag).",
          "Không thêm “the” trước tính từ sở hữu: my book (không nói “the my book”).",
          "Tính từ sở hữu chọn theo NGƯỜI SỞ HỮU, không theo vật: Lan's father → her father (vì Lan là nữ).",
        ],
        examples: [
          { en: "This is my bag. This bag is mine.", vi: "Đây là túi của tôi. Cái túi này là của tôi." },
          { en: "Is this your phone? – No, it's hers.", vi: "Đây là điện thoại của bạn à? – Không, nó là của cô ấy." },
          { en: "Our house is small, but theirs is big.", vi: "Nhà chúng tôi nhỏ, còn nhà họ thì to." },
          { en: "The dog is eating its food.", vi: "Con chó đang ăn đồ ăn của nó." },
        ],
      },
      {
        heading: "Sở hữu cách 's",
        text: "Dùng 's để nói “của ai” với người và con vật: người sở hữu + 's + vật được sở hữu.",
        points: [
          "Danh từ số ít: thêm 's → Tom's car, my mother's job.",
          "Danh từ số nhiều có đuôi -s: chỉ thêm dấu ' → my parents' house, the students' books.",
          "Danh từ số nhiều bất quy tắc (không có -s): thêm 's → the children's room, women's clothes.",
          "Hai người cùng sở hữu một thứ: chỉ thêm 's vào người thứ hai → Tom and Anna's house.",
          "Với đồ vật, thường dùng “of”: the door of the room, the end of the film.",
          "Cẩn thận: 's cũng có thể là viết tắt của “is”: Tom's tired = Tom is tired.",
        ],
        examples: [
          { en: "This is Lan's bike.", vi: "Đây là xe đạp của Lan." },
          { en: "My parents' house is in Da Nang.", vi: "Nhà của bố mẹ tôi ở Đà Nẵng." },
          { en: "The children's room is upstairs.", vi: "Phòng của bọn trẻ ở trên lầu." },
        ],
      },
      {
        heading: "Những cặp dễ nhầm",
        table: {
          head: ["Từ", "Nghĩa", "Ví dụ"],
          rows: [
            ["its", "của nó (sở hữu)", "The cat is playing with its toy."],
            ["it's", "it is / it has (viết tắt)", "It's hot today."],
            ["their", "của họ", "Their car is red."],
            ["they're", "they are", "They're my friends."],
            ["there", "ở đó / có (there is)", "There is a park near here."],
            ["whose", "của ai (từ để hỏi)", "Whose bag is this?"],
            ["who's", "who is", "Who's that girl?"],
          ],
        },
      },
    ],
    mistakes: [
      {
        wrong: "Him is my friend.",
        right: "He is my friend.",
        why: "Vị trí chủ ngữ (trước động từ) phải dùng đại từ chủ ngữ “he”, không dùng “him”.",
      },
      {
        wrong: "I love she.",
        right: "I love her.",
        why: "Sau động từ là vị trí tân ngữ, nên dùng “her”.",
      },
      {
        wrong: "This book is my.",
        right: "This book is mine.",
        why: "“My” phải đi kèm danh từ phía sau. Khi đứng một mình, dùng đại từ sở hữu “mine”.",
      },
      {
        wrong: "Lan is my friend. His father is a doctor.",
        right: "Lan is my friend. Her father is a doctor.",
        why: "Tính từ sở hữu chọn theo người sở hữu: Lan là nữ nên dùng “her”, dù “father” là nam.",
      },
      {
        wrong: "This is the car of my father.",
        right: "This is my father's car.",
        why: "Với người, tiếng Anh thường dùng sở hữu cách 's thay vì “of”. Câu dùng “of” nghe rất không tự nhiên.",
      },
    ],
    exercises: [
      {
        kind: "choice",
        question: "Can you help ___?",
        options: ["I", "me", "my", "mine"],
        answer: 1,
        explain: "Sau động từ “help” là vị trí tân ngữ, nên dùng “me”.",
      },
      {
        kind: "choice",
        question: "Anna is my friend. ___ brother is a pilot.",
        options: ["Her", "His", "She", "Hers"],
        answer: 0,
        explain: "Người sở hữu là Anna (nữ) và phía sau có danh từ “brother”, nên dùng tính từ sở hữu “Her”. “His” sai vì phải chọn theo người sở hữu, không theo “brother”.",
      },
      {
        kind: "choice",
        question: "That's not my pen. ___ is blue.",
        options: ["My", "Me", "Mine", "I"],
        answer: 2,
        explain: "Chỗ trống đứng một mình, không có danh từ theo sau, nên dùng đại từ sở hữu “Mine” (= my pen).",
      },
      {
        kind: "choice",
        question: "The cat is playing with ___ toy.",
        options: ["it's", "its", "it", "its'"],
        answer: 1,
        explain: "“its” = của nó (sở hữu). “it's” là viết tắt của “it is”, còn “its'” không tồn tại.",
      },
      {
        kind: "choice",
        question: "The ___ room is upstairs. (phòng của bọn trẻ)",
        options: ["childrens'", "childrens", "children", "children's"],
        answer: 3,
        explain: "“children” là số nhiều bất quy tắc, không có đuôi -s, nên thêm 's: children's. Không có từ “childrens”.",
      },
      {
        kind: "fill",
        question: "I know Peter, but I don't know ___ sister.",
        hint: "he",
        answers: ["his"],
        explain: "Phía sau có danh từ “sister” và người sở hữu là Peter (nam), nên dùng tính từ sở hữu “his”.",
      },
      {
        kind: "fill",
        question: "These are my sister's shoes. They're ___.",
        hint: "she",
        answers: ["hers"],
        explain: "Chỗ trống đứng một mình (không có danh từ sau) nên dùng đại từ sở hữu “hers” (= her shoes).",
      },
      {
        kind: "fill",
        question: "Our teacher gives ___ a lot of homework.",
        hint: "we",
        answers: ["us"],
        explain: "Sau động từ “gives” là tân ngữ, nên “we” đổi thành “us”.",
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // 3. ARTICLES
  // ---------------------------------------------------------------------------
  {
    id: "a1-articles",
    level: "A1",
    title: "Mạo từ a / an / the",
    titleEn: "Articles: a / an / the",
    summary:
      "Biết khi nào dùng a, an, the và khi nào không dùng mạo từ — một điểm khó vì tiếng Việt không có mạo từ.",
    sections: [
      {
        heading: "Mạo từ là gì?",
        text:
          "Mạo từ là từ nhỏ đứng trước danh từ. Tiếng Việt không có mạo từ nên người Việt hay quên hoặc dùng sai.",
        points: [
          "a / an (mạo từ không xác định): “một” cái nào đó, người nghe chưa biết cụ thể là cái nào. Chỉ dùng với danh từ đếm được SỐ ÍT.",
          "the (mạo từ xác định): cái mà cả người nói và người nghe đều biết là cái nào. Dùng được với danh từ số ít, số nhiều và không đếm được.",
          "Danh từ đếm được số ít KHÔNG được đứng một mình: phải có a/an, the, my, this... phía trước (a book, the book, my book).",
        ],
      },
      {
        heading: "A hay an?",
        text: "Chọn a hay an dựa vào ÂM đầu tiên khi đọc, không phải chữ cái đầu tiên.",
        points: [
          "an + từ bắt đầu bằng NGUYÊN ÂM (âm a, e, i, o, u): an apple, an egg, an orange, an umbrella.",
          "a + từ bắt đầu bằng PHỤ ÂM: a book, a car, a dog.",
          "h câm (không đọc) → an: an hour, an honest man.",
          "u, eu đọc là /juː/ (giống “diu”) → a: a university, a uniform, a European city.",
          "Nếu có tính từ đứng trước danh từ, xét âm của tính từ: an old house, a big apple.",
        ],
        examples: [
          { en: "She's an engineer.", vi: "Cô ấy là kỹ sư." },
          { en: "It's an old house.", vi: "Đó là một ngôi nhà cũ." },
          { en: "He studies at a university in Hanoi.", vi: "Anh ấy học ở một trường đại học tại Hà Nội." },
        ],
      },
      {
        heading: "Khi nào dùng a / an?",
        points: [
          "Nhắc đến một người/vật lần đầu tiên: I have a dog.",
          "Nói nghề nghiệp (tiếng Việt không cần “một”, nhưng tiếng Anh bắt buộc): My father is a driver.",
          "Nói “một” cái bất kỳ trong nhiều cái: Can I have a pen?",
          "Nói tần suất, giá theo đơn vị (“mỗi”): twice a week, three times a day, 50,000 dong a kilo.",
        ],
      },
      {
        heading: "Khi nào dùng the?",
        points: [
          "Nhắc lại người/vật đã được nói đến: I have a dog and a cat. The dog is black.",
          "Người nghe biết rõ là cái nào (trong hoàn cảnh cụ thể): Can you open the window, please?",
          "Vật duy nhất: the sun, the moon, the sky, the world.",
          "Nhạc cụ khi nói chơi đàn: play the guitar, play the piano.",
          "Các buổi trong ngày: in the morning, in the afternoon, in the evening.",
        ],
        examples: [
          { en: "I have a dog and a cat. The dog is black.", vi: "Tôi có một con chó và một con mèo. Con chó màu đen." },
          { en: "Can you open the window, please?", vi: "Bạn mở giúp cái cửa sổ được không?" },
          { en: "The sun is very hot today.", vi: "Hôm nay mặt trời rất nóng." },
          { en: "My brother plays the guitar.", vi: "Anh trai tôi chơi đàn ghi-ta." },
        ],
      },
      {
        heading: "Khi nào KHÔNG dùng mạo từ?",
        points: [
          "Danh từ số nhiều hoặc không đếm được khi nói chung chung: I like cats. Coffee is expensive.",
          "Bữa ăn: have breakfast / lunch / dinner.",
          "Môn thể thao, môn học, ngôn ngữ: play football, study maths, speak English.",
          "Tên người, phần lớn tên thành phố và quốc gia: Lan, Hanoi, Vietnam (ngoại lệ: the USA, the UK).",
          "Một số cụm cố định: go to school, go to work, go to bed, at home, by bus.",
          "Trước next / last / this / every: next week, last year, every day.",
        ],
        examples: [
          { en: "I don't like coffee.", vi: "Tôi không thích cà phê." },
          { en: "We have lunch at 12.", vi: "Chúng tôi ăn trưa lúc 12 giờ." },
          { en: "He goes to work by bus.", vi: "Anh ấy đi làm bằng xe buýt." },
          { en: "My son plays football every Sunday.", vi: "Con trai tôi chơi bóng đá vào mỗi Chủ nhật." },
        ],
      },
    ],
    mistakes: [
      {
        wrong: "She is teacher.",
        right: "She is a teacher.",
        why: "Khi nói nghề nghiệp của một người, tiếng Anh bắt buộc dùng a/an.",
      },
      {
        wrong: "I eat a apple every day.",
        right: "I eat an apple every day.",
        why: "“apple” bắt đầu bằng nguyên âm nên dùng “an”.",
      },
      {
        wrong: "There is an university near here.",
        right: "There is a university near here.",
        why: "“university” đọc bắt đầu bằng âm /juː/ (phụ âm), nên dùng “a”.",
      },
      {
        wrong: "I like the cats.",
        right: "I like cats.",
        why: "Khi nói chung về một loài/một loại, dùng danh từ số nhiều không có “the”.",
      },
      {
        wrong: "I play the football and have a breakfast at 7.",
        right: "I play football and have breakfast at 7.",
        why: "Không dùng mạo từ trước tên môn thể thao và bữa ăn.",
      },
    ],
    exercises: [
      {
        kind: "choice",
        question: "I eat ___ egg every morning.",
        options: ["a", "the", "—", "an"],
        answer: 3,
        explain: "“egg” bắt đầu bằng nguyên âm và là danh từ đếm được số ít, nên dùng “an”. (“—” nghĩa là không dùng mạo từ.)",
      },
      {
        kind: "choice",
        question: "My brother is ___ university student.",
        options: ["an", "a", "—"],
        answer: 1,
        explain: "“university” đọc bắt đầu bằng âm /juː/ (phụ âm) nên dùng “a”, dù chữ cái đầu là “u”.",
      },
      {
        kind: "choice",
        question: "Look at ___ moon! It's so beautiful.",
        options: ["a", "an", "the", "—"],
        answer: 2,
        explain: "Mặt trăng là vật duy nhất nên dùng “the”.",
      },
      {
        kind: "choice",
        question: "I usually go to ___ bed at 11 p.m.",
        options: ["—", "a", "the"],
        answer: 0,
        explain: "“go to bed” (đi ngủ) là cụm cố định, không dùng mạo từ.",
      },
      {
        kind: "choice",
        question: "We have a cat and a dog. ___ dog is very friendly.",
        options: ["A", "The", "An", "—"],
        answer: 1,
        explain: "Con chó đã được nhắc đến ở câu trước, nên lần thứ hai dùng “The”.",
      },
      {
        kind: "fill",
        question: "There's ___ university near my house.",
        hint: "a / an / the",
        answers: ["a"],
        explain: "Nhắc đến lần đầu, danh từ số ít đếm được → a/an. “university” bắt đầu bằng âm /juː/ nên dùng “a”.",
      },
      {
        kind: "fill",
        question: "Can you close ___ door, please? It's cold.",
        hint: "a / an / the",
        answers: ["the"],
        explain: "Cả hai người đều biết đó là cánh cửa nào (cửa của căn phòng đang ở), nên dùng “the”.",
      },
      {
        kind: "fill",
        question: "I waited for him for ___ hour.",
        hint: "a / an / the",
        answers: ["an"],
        explain: "Chữ “h” trong “hour” là âm câm, từ này bắt đầu bằng nguyên âm /aʊ/, nên dùng “an”.",
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // 4. PLURALS & THIS/THAT/THESE/THOSE
  // ---------------------------------------------------------------------------
  {
    id: "a1-plurals",
    level: "A1",
    title: "Danh từ số nhiều và this / that / these / those",
    titleEn: "Plural nouns; this / that / these / those",
    summary:
      "Cách biến danh từ số ít thành số nhiều (có quy tắc và bất quy tắc), cách đọc đuôi -s/-es, và cách dùng this, that, these, those.",
    sections: [
      {
        heading: "Số ít và số nhiều",
        text:
          "Tiếng Việt thêm “những, các” để chỉ số nhiều, còn tiếng Anh thay đổi chính danh từ (thường thêm -s/-es). Danh từ số nhiều không đi với a/an, và động từ phải chia theo số nhiều.",
        examples: [
          { en: "I have two brothers and three sisters.", vi: "Tôi có hai anh trai và ba chị gái." },
          { en: "There are many buses in the city.", vi: "Trong thành phố có nhiều xe buýt." },
        ],
      },
      {
        heading: "Quy tắc thêm -s / -es",
        table: {
          head: ["Danh từ tận cùng bằng", "Cách đổi", "Ví dụ"],
          rows: [
            ["Phần lớn danh từ", "+ s", "book → books, car → cars"],
            ["-s, -ss, -sh, -ch, -x, -z", "+ es", "bus → buses, class → classes, dish → dishes, watch → watches, box → boxes"],
            ["Phụ âm + y", "bỏ y, thêm ies", "baby → babies, city → cities"],
            ["Nguyên âm + y", "+ s", "boy → boys, day → days, key → keys"],
            ["-f / -fe", "thường đổi thành -ves", "knife → knives, leaf → leaves, wife → wives (ngoại lệ: roof → roofs)"],
            ["-o", "thường + es", "potato → potatoes, tomato → tomatoes (nhưng photo → photos, piano → pianos, radio → radios)"],
          ],
        },
      },
      {
        heading: "Danh từ số nhiều bất quy tắc",
        points: [
          "man → men, woman → women, child → children, person → people.",
          "foot → feet, tooth → teeth, mouse → mice.",
          "Không đổi: sheep → sheep, fish → fish.",
          "“people” đã là số nhiều nên dùng “are”: People are friendly here.",
          "Một số từ luôn ở dạng số nhiều: trousers, jeans, glasses (kính), scissors → My jeans are new.",
        ],
        examples: [
          { en: "The children are in the garden.", vi: "Bọn trẻ đang ở trong vườn." },
          { en: "My feet are cold.", vi: "Chân tôi lạnh." },
        ],
      },
      {
        heading: "This / that / these / those",
        table: {
          head: ["", "Ở gần (đây)", "Ở xa (kia)"],
          rows: [
            ["Số ít", "this (cái này)", "that (cái kia)"],
            ["Số nhiều", "these (những cái này)", "those (những cái kia)"],
          ],
        },
        points: [
          "Có thể đứng trước danh từ (this book) hoặc đứng một mình (This is my book).",
          "this / that đi với danh từ số ít và “is”; these / those đi với danh từ số nhiều và “are”.",
          "Dùng “This is...” để giới thiệu người: This is my friend, Nam.",
          "Khi gọi điện thoại: Hello, this is Lan. (A lô, Lan đây.)",
        ],
        examples: [
          { en: "These shoes are new.", vi: "Đôi giày này mới." },
          { en: "Is this your bag?", vi: "Đây có phải túi của bạn không?" },
          { en: "That house is very big.", vi: "Ngôi nhà kia rất to." },
          { en: "Those people are my neighbours.", vi: "Những người kia là hàng xóm của tôi." },
          { en: "This is my friend, Nam.", vi: "Đây là bạn tôi, Nam." },
        ],
      },
      {
        heading: "Cách đọc đuôi -s / -es",
        points: [
          "/ɪz/ sau các âm /s/, /z/, /ʃ/, /tʃ/, /dʒ/: buses, roses, dishes, watches, oranges.",
          "/s/ sau các âm vô thanh /p/, /t/, /k/, /f/, /θ/: cups, cats, books, months.",
          "/z/ sau các âm còn lại: dogs, pens, days, trees.",
        ],
      },
    ],
    mistakes: [
      {
        wrong: "I have two book.",
        right: "I have two books.",
        why: "Sau số đếm lớn hơn một, danh từ đếm được phải ở dạng số nhiều.",
      },
      {
        wrong: "The childrens are playing.",
        right: "The children are playing.",
        why: "“children” đã là số nhiều bất quy tắc, không thêm -s nữa.",
      },
      {
        wrong: "These book is mine.",
        right: "These books are mine.",
        why: "“These” đi với danh từ số nhiều và “are”. Nếu chỉ một quyển: This book is mine.",
      },
      {
        wrong: "The people is very friendly.",
        right: "The people are very friendly.",
        why: "“people” là số nhiều nên động từ phải là “are”.",
      },
    ],
    exercises: [
      {
        kind: "choice",
        question: "Số nhiều của “box” là:",
        options: ["boxs", "boxes", "boxies", "box"],
        answer: 1,
        explain: "Danh từ tận cùng bằng -x thêm -es: box → boxes.",
      },
      {
        kind: "choice",
        question: "Look at ___ birds in the sky!",
        options: ["this", "that", "those", "a"],
        answer: 2,
        explain: "“birds” là số nhiều và ở xa (trên trời), nên dùng “those”. “this/that” chỉ đi với danh từ số ít.",
      },
      {
        kind: "choice",
        question: "The ___ are playing in the park.",
        options: ["child", "childs", "children", "childrens"],
        answer: 2,
        explain: "Động từ “are” cho thấy chủ ngữ số nhiều. Số nhiều của “child” là “children” (bất quy tắc).",
      },
      {
        kind: "choice",
        question: "___ is my sister, Mai. (giới thiệu người đứng cạnh bạn)",
        options: ["This", "These", "Those"],
        answer: 0,
        explain: "Giới thiệu một người ở gần dùng “This is...”. “These/Those” dùng cho số nhiều.",
      },
      {
        kind: "choice",
        question: "Câu nào đúng?",
        options: [
          "Those people is very kind.",
          "That people are very kind.",
          "Those persons is very kind.",
          "Those people are very kind.",
        ],
        answer: 3,
        explain: "“people” là số nhiều → dùng “those” và “are”. Các câu khác sai vì dùng “is” hoặc “that” với danh từ số nhiều.",
      },
      {
        kind: "fill",
        question: "I need two ___ for the party.",
        hint: "knife",
        answers: ["knives"],
        explain: "Danh từ tận cùng bằng -fe thường đổi thành -ves: knife → knives.",
      },
      {
        kind: "fill",
        question: "She bought some ___ at the market.",
        hint: "tomato",
        answers: ["tomatoes"],
        explain: "“tomato” tận cùng bằng -o, thêm -es: tomatoes.",
      },
      {
        kind: "fill",
        question: "There are ten ___ in my office.",
        hint: "woman",
        answers: ["women"],
        explain: "“woman” là danh từ bất quy tắc: woman → women.",
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // 5. PRESENT SIMPLE
  // ---------------------------------------------------------------------------
  {
    id: "a1-present-simple",
    level: "A1",
    title: "Thì hiện tại đơn",
    titleEn: "Present simple",
    summary:
      "Dùng thì hiện tại đơn để nói về thói quen, việc lặp đi lặp lại và sự thật; học cách chia động từ với -s/-es và dùng do/does trong câu phủ định, câu hỏi.",
    sections: [
      {
        heading: "Khi nào dùng thì hiện tại đơn?",
        points: [
          "Thói quen, việc làm lặp đi lặp lại: I get up at 6 every day.",
          "Sự thật, điều luôn đúng: Water boils at 100 degrees Celsius.",
          "Trạng thái lâu dài, công việc, nơi ở: My mother works in a hospital.",
          "Sở thích, cảm xúc: I like music.",
          "Lịch trình cố định (tàu, xe, phim, lớp học): The train leaves at 8:15.",
        ],
        examples: [
          { en: "I get up at 6 every day.", vi: "Tôi thức dậy lúc 6 giờ mỗi ngày." },
          { en: "My mother works in a hospital.", vi: "Mẹ tôi làm việc ở bệnh viện." },
          { en: "The sun rises in the east.", vi: "Mặt trời mọc ở hướng đông." },
          { en: "The train leaves at 8:15.", vi: "Tàu khởi hành lúc 8 giờ 15." },
        ],
      },
      {
        heading: "Công thức",
        formulas: [
          { label: "Khẳng định (I/you/we/they)", pattern: "S + V" },
          { label: "Khẳng định (he/she/it)", pattern: "S + V-s/es" },
          { label: "Phủ định", pattern: "S + do not (don't) / does not (doesn't) + V" },
          { label: "Nghi vấn", pattern: "Do/Does + S + V?" },
          { label: "Trả lời ngắn", pattern: "Yes, S + do/does. / No, S + don't/doesn't." },
          { label: "Câu hỏi Wh-", pattern: "Wh- + do/does + S + V?" },
        ],
        points: [
          "I / you / we / they (và danh từ số nhiều) → do / don't.",
          "he / she / it (và danh từ số ít) → does / doesn't.",
          "Khi đã có does/doesn't, động từ chính trở về nguyên mẫu, KHÔNG thêm -s: She doesn't like... / Does she like...?",
        ],
        examples: [
          { en: "He doesn't eat meat.", vi: "Anh ấy không ăn thịt." },
          { en: "We don't watch TV in the morning.", vi: "Chúng tôi không xem TV vào buổi sáng." },
          { en: "Do you like coffee? – Yes, I do.", vi: "Bạn có thích cà phê không? – Có, tôi thích." },
          { en: "Does she speak English? – No, she doesn't.", vi: "Cô ấy có nói tiếng Anh không? – Không." },
          { en: "Where do you live?", vi: "Bạn sống ở đâu?" },
        ],
      },
      {
        heading: "Cách thêm -s / -es cho động từ (he / she / it)",
        table: {
          head: ["Động từ tận cùng bằng", "Cách thêm", "Ví dụ"],
          rows: [
            ["Phần lớn động từ", "+ s", "work → works, read → reads"],
            ["-s, -ss, -sh, -ch, -x, -z, -o", "+ es", "miss → misses, wash → washes, watch → watches, fix → fixes, go → goes, do → does"],
            ["Phụ âm + y", "bỏ y, thêm ies", "study → studies, fly → flies, cry → cries"],
            ["Nguyên âm + y", "+ s", "play → plays, buy → buys, say → says"],
            ["Bất quy tắc", "—", "have → has"],
          ],
        },
      },
      {
        heading: "Dấu hiệu nhận biết và vị trí trạng từ tần suất",
        points: [
          "Trạng từ tần suất: always (luôn luôn), usually (thường xuyên), often (thường), sometimes (thỉnh thoảng), rarely / seldom (hiếm khi), never (không bao giờ).",
          "Cụm thời gian: every day / week / year, once a week, twice a month, on Mondays, in the morning.",
          "Trạng từ tần suất đứng TRƯỚC động từ thường: She always goes to school by bike.",
          "Nhưng đứng SAU động từ “to be”: He is never late.",
        ],
        examples: [
          { en: "She always goes to school by bike.", vi: "Cô ấy luôn đi học bằng xe đạp." },
          { en: "He is never late.", vi: "Anh ấy không bao giờ đến trễ." },
          { en: "I play badminton twice a week.", vi: "Tôi chơi cầu lông hai lần một tuần." },
        ],
      },
      {
        heading: "Lưu ý với động từ “to be”",
        text:
          "Động từ “to be” (am/is/are) có cách chia riêng và KHÔNG dùng với do/does. Ngược lại, động từ thường không đi kèm am/is/are ở thì hiện tại đơn.",
        table: {
          head: ["", "To be", "Động từ thường"],
          rows: [
            ["Khẳng định", "She is a teacher.", "She teaches English."],
            ["Phủ định", "She isn't a teacher.", "She doesn't teach English."],
            ["Câu hỏi", "Is she a teacher?", "Does she teach English?"],
          ],
        },
      },
    ],
    mistakes: [
      {
        wrong: "She go to school every day.",
        right: "She goes to school every day.",
        why: "Chủ ngữ “she” (ngôi thứ ba số ít) thì động từ phải thêm -s/-es.",
      },
      {
        wrong: "He doesn't likes coffee.",
        right: "He doesn't like coffee.",
        why: "Sau “doesn't”, động từ trở về nguyên mẫu, không thêm -s.",
      },
      {
        wrong: "Does she speaks English?",
        right: "Does she speak English?",
        why: "Trong câu hỏi đã có “Does” chia theo ngôi, nên động từ chính giữ nguyên mẫu.",
      },
      {
        wrong: "She don't like fish.",
        right: "She doesn't like fish.",
        why: "He/she/it dùng “doesn't”, không dùng “don't”.",
      },
      {
        wrong: "I am go to work at 7.",
        right: "I go to work at 7.",
        why: "Không đặt “am/is/are” trước động từ thường ở thì hiện tại đơn.",
      },
    ],
    exercises: [
      {
        kind: "choice",
        question: "My father ___ coffee every morning.",
        options: ["drink", "drinks", "drinking", "is drink"],
        answer: 1,
        explain: "Thói quen (every morning) → hiện tại đơn. “My father” = he, nên động từ thêm -s: drinks.",
      },
      {
        kind: "choice",
        question: "___ your sister live in Hanoi?",
        options: ["Do", "Is", "Does", "Are"],
        answer: 2,
        explain: "“live” là động từ thường, chủ ngữ “your sister” (= she) nên câu hỏi dùng “Does”. “Is” sai vì không dùng “to be” với động từ thường ở thì này.",
      },
      {
        kind: "choice",
        question: "They ___ like spicy food.",
        options: ["doesn't", "aren't", "isn't", "don't"],
        answer: 3,
        explain: "Chủ ngữ “they” dùng “don't”. “doesn't” chỉ dùng cho he/she/it.",
      },
      {
        kind: "choice",
        question: "She ___ her teeth twice a day.",
        options: ["brushes", "brush", "brushs", "is brush"],
        answer: 0,
        explain: "Động từ tận cùng bằng -sh thêm -es khi chủ ngữ là she: brushes.",
      },
      {
        kind: "choice",
        question: "How often ___ he play football?",
        options: ["do", "does", "is", "has"],
        answer: 1,
        explain: "Câu hỏi Wh- với động từ thường: Wh- + does + he + V. Chủ ngữ “he” dùng “does”.",
      },
      {
        kind: "fill",
        question: "My brother ___ English at university.",
        hint: "study",
        answers: ["studies"],
        explain: "“study” tận cùng bằng phụ âm + y → bỏ y thêm ies: studies.",
      },
      {
        kind: "fill",
        question: "Tom ___ meat. He's a vegetarian.",
        hint: "not eat",
        answers: ["doesn't eat", "does not eat"],
        explain: "Chủ ngữ “Tom” = he → phủ định dùng “doesn't/does not” + động từ nguyên mẫu “eat”.",
      },
      {
        kind: "fill",
        question: "She ___ two cats and a dog.",
        hint: "have",
        answers: ["has"],
        explain: "“have” là động từ bất quy tắc: với he/she/it dùng “has”.",
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // 6. PRESENT CONTINUOUS
  // ---------------------------------------------------------------------------
  {
    id: "a1-present-continuous",
    level: "A1",
    title: "Thì hiện tại tiếp diễn",
    titleEn: "Present continuous",
    summary:
      "Dùng thì hiện tại tiếp diễn (am/is/are + V-ing) để nói về việc đang xảy ra; học quy tắc thêm -ing, cách phân biệt với hiện tại đơn và những động từ không dùng ở dạng tiếp diễn.",
    sections: [
      {
        heading: "Khi nào dùng thì hiện tại tiếp diễn?",
        points: [
          "Việc đang xảy ra ngay lúc nói: I'm watching TV now.",
          "Việc đang diễn ra trong giai đoạn hiện tại (không nhất thiết đúng lúc nói): I'm reading a very good book these days.",
          "Tình huống tạm thời: I'm working at home this week.",
          "Kế hoạch tương lai đã sắp xếp (thường có thời gian đi kèm): We're visiting our grandparents this weekend.",
        ],
        examples: [
          { en: "I'm watching TV now.", vi: "Bây giờ tôi đang xem TV." },
          { en: "I'm reading a very good book these days.", vi: "Dạo này tôi đang đọc một cuốn sách rất hay." },
          { en: "We're visiting our grandparents this weekend.", vi: "Cuối tuần này chúng tôi sẽ đi thăm ông bà." },
        ],
      },
      {
        heading: "Công thức",
        formulas: [
          { label: "Khẳng định", pattern: "S + am/is/are + V-ing" },
          { label: "Phủ định", pattern: "S + am/is/are + not + V-ing" },
          { label: "Nghi vấn", pattern: "Am/Is/Are + S + V-ing?" },
          { label: "Trả lời ngắn", pattern: "Yes, S + am/is/are. / No, S + 'm not / isn't / aren't." },
          { label: "Câu hỏi Wh-", pattern: "Wh- + am/is/are + S + V-ing?" },
        ],
        examples: [
          { en: "She is cooking dinner at the moment.", vi: "Lúc này cô ấy đang nấu bữa tối." },
          { en: "They aren't working today.", vi: "Hôm nay họ không làm việc." },
          { en: "Are you listening to me? – Yes, I am.", vi: "Bạn có đang nghe tôi nói không? – Có." },
          { en: "What are you doing? – I'm writing an email.", vi: "Bạn đang làm gì vậy? – Tôi đang viết email." },
        ],
      },
      {
        heading: "Quy tắc thêm -ing",
        table: {
          head: ["Trường hợp", "Cách thêm", "Ví dụ"],
          rows: [
            ["Phần lớn động từ", "+ ing", "work → working, read → reading, play → playing"],
            ["Tận cùng bằng -e câm", "bỏ e, thêm ing", "make → making, write → writing, come → coming (nhưng: see → seeing, be → being)"],
            ["Tận cùng bằng -ie", "đổi ie → y, thêm ing", "lie → lying, die → dying, tie → tying"],
            ["Một âm tiết, kết thúc bằng phụ âm + nguyên âm + phụ âm", "gấp đôi phụ âm cuối", "run → running, sit → sitting, swim → swimming, stop → stopping, get → getting"],
            ["Hai âm tiết, trọng âm ở âm tiết cuối", "gấp đôi phụ âm cuối", "begin → beginning (nhưng visit → visiting, listen → listening vì trọng âm ở âm đầu)"],
          ],
        },
        points: [
          "Không gấp đôi w, x, y ở cuối: snow → snowing, fix → fixing, play → playing.",
          "Không gấp đôi khi có hai nguyên âm trước phụ âm cuối: rain → raining, eat → eating.",
          "Tiếng Anh–Anh gấp đôi -l: travel → travelling; tiếng Anh–Mỹ: traveling. Cả hai đều đúng.",
        ],
      },
      {
        heading: "Dấu hiệu nhận biết",
        points: [
          "now, right now, at the moment, at present.",
          "today, this week, this month, these days.",
          "Câu mệnh lệnh gây chú ý: Look! Listen! Be quiet!",
        ],
        examples: [
          { en: "Look! It's raining.", vi: "Nhìn kìa! Trời đang mưa." },
          { en: "Be quiet! The baby is sleeping.", vi: "Trật tự nào! Em bé đang ngủ." },
        ],
      },
      {
        heading: "Động từ trạng thái: không dùng ở dạng tiếp diễn",
        text:
          "Một số động từ chỉ suy nghĩ, cảm xúc, sở hữu, nhận thức (không phải hành động) thường KHÔNG dùng ở dạng tiếp diễn, kể cả khi nói về lúc này.",
        points: [
          "Cảm xúc, sở thích: like, love, hate, want, need, prefer.",
          "Suy nghĩ, hiểu biết: know, understand, believe, remember, mean.",
          "Sở hữu: own, belong; have (khi nghĩa là “có”).",
          "Nói “I know the answer.” — không nói “I'm knowing the answer.”",
          "Lưu ý: “have” khi chỉ hành động thì vẫn dùng tiếp diễn được: I'm having lunch. (Tôi đang ăn trưa.)",
          "“think” nghĩa là “cho rằng” thì không dùng tiếp diễn (I think it's good), nhưng nghĩa “đang suy nghĩ” thì được (I'm thinking about my holiday).",
        ],
        examples: [
          { en: "I need some help now.", vi: "Bây giờ tôi cần giúp đỡ.", note: "Không nói “I'm needing”." },
          { en: "She's having breakfast.", vi: "Cô ấy đang ăn sáng." },
        ],
      },
      {
        heading: "So sánh hiện tại đơn và hiện tại tiếp diễn",
        table: {
          head: ["", "Hiện tại đơn", "Hiện tại tiếp diễn"],
          rows: [
            ["Dùng cho", "Thói quen, việc lặp lại, sự thật", "Việc đang xảy ra lúc nói hoặc trong giai đoạn này"],
            ["Tính chất", "Lâu dài, cố định", "Tạm thời"],
            ["Ví dụ", "I work in a bank.", "I'm working at home today."],
            ["Dấu hiệu", "always, usually, every day, on Mondays", "now, at the moment, today, Look!"],
          ],
        },
        examples: [
          {
            en: "He usually walks to work, but today he's taking a taxi.",
            vi: "Anh ấy thường đi bộ đi làm, nhưng hôm nay anh ấy đi taxi.",
          },
        ],
      },
    ],
    mistakes: [
      {
        wrong: "I watching TV.",
        right: "I'm watching TV.",
        why: "Thì hiện tại tiếp diễn cần đủ hai phần: am/is/are + V-ing. Không được bỏ “am”.",
      },
      {
        wrong: "He is writeing a letter.",
        right: "He is writing a letter.",
        why: "Động từ tận cùng bằng -e câm thì bỏ e trước khi thêm -ing.",
      },
      {
        wrong: "She is siting near the window.",
        right: "She is sitting near the window.",
        why: "“sit” có một âm tiết, kết thúc bằng phụ âm–nguyên âm–phụ âm, nên gấp đôi t: sitting.",
      },
      {
        wrong: "I am knowing the answer.",
        right: "I know the answer.",
        why: "“know” là động từ trạng thái, không dùng ở dạng tiếp diễn.",
      },
      {
        wrong: "Look! It rains.",
        right: "Look! It's raining.",
        why: "“Look!” cho thấy việc đang xảy ra ngay lúc nói, nên dùng hiện tại tiếp diễn.",
      },
    ],
    exercises: [
      {
        kind: "choice",
        question: "Listen! Somebody ___ the piano.",
        options: ["plays", "is playing", "play", "are playing"],
        answer: 1,
        explain: "“Listen!” → việc đang diễn ra lúc nói, dùng hiện tại tiếp diễn. “Somebody” chia số ít nên dùng “is playing”.",
      },
      {
        kind: "choice",
        question: "I ___ what you mean.",
        options: ["am not understanding", "not understand", "don't understand", "isn't understand"],
        answer: 2,
        explain: "“understand” là động từ trạng thái, không dùng tiếp diễn. Phủ định hiện tại đơn với “I”: don't understand.",
      },
      {
        kind: "choice",
        question: "Dạng V-ing đúng của “swim” là:",
        options: ["swiming", "swimming", "swimeing"],
        answer: 1,
        explain: "“swim” có một âm tiết, kết thúc bằng phụ âm–nguyên âm–phụ âm (w-i-m), nên gấp đôi m: swimming.",
      },
      {
        kind: "choice",
        question: "My dad usually ___ to work by car.",
        options: ["drives", "is driving", "driving", "drive"],
        answer: 0,
        explain: "“usually” chỉ thói quen → hiện tại đơn. “My dad” = he nên dùng “drives”.",
      },
      {
        kind: "choice",
        question: "___ they playing football now?",
        options: ["Do", "Is", "Does", "Are"],
        answer: 3,
        explain: "Câu hỏi hiện tại tiếp diễn: Am/Is/Are + S + V-ing. Chủ ngữ “they” đi với “Are”.",
      },
      {
        kind: "fill",
        question: "Be quiet! The baby ___.",
        hint: "sleep",
        answers: ["is sleeping", "'s sleeping"],
        explain: "“Be quiet!” → việc đang xảy ra. “The baby” = it → is + sleeping.",
      },
      {
        kind: "fill",
        question: "We ___ TV right now. We're doing our homework.",
        hint: "not watch",
        answers: ["aren't watching", "are not watching", "'re not watching"],
        explain: "“right now” → hiện tại tiếp diễn. Phủ định với “we”: are not (aren't) + watching.",
      },
      {
        kind: "fill",
        question: "Look! The cat ___ on your bed.",
        hint: "lie",
        answers: ["is lying", "'s lying"],
        explain: "Động từ tận cùng bằng -ie đổi thành -y rồi thêm -ing: lie → lying. “The cat” = it → is lying.",
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // 7. THERE IS / THERE ARE
  // ---------------------------------------------------------------------------
  {
    id: "a1-there-is",
    level: "A1",
    title: "There is / There are",
    titleEn: "There is / There are",
    summary:
      "Dùng there is / there are để nói “có” cái gì ở đâu; cách viết câu khẳng định, phủ định, câu hỏi và cách dùng với a / an / some / any.",
    sections: [
      {
        heading: "There is / There are dùng để làm gì?",
        text:
          "Dùng để nói rằng có một người/vật tồn tại hoặc có mặt ở đâu đó. Tiếng Việt nói “Có một quyển sách trên bàn”, nhưng tiếng Anh KHÔNG dùng “have” ở đây mà dùng “There is a book on the table”.",
        points: [
          "There is (There's) + danh từ số ít hoặc danh từ không đếm được.",
          "There are + danh từ số nhiều.",
          "Thường có cụm chỉ nơi chốn đi kèm: in my room, near here, on the table...",
        ],
      },
      {
        heading: "Công thức",
        formulas: [
          { label: "Khẳng định (số ít)", pattern: "There is (There's) + a/an + N số ít" },
          { label: "Khẳng định (không đếm được)", pattern: "There is + some + N không đếm được" },
          { label: "Khẳng định (số nhiều)", pattern: "There are + some / số đếm + N số nhiều" },
          { label: "Phủ định", pattern: "There isn't + a/an / any + N  —  There aren't + any + N số nhiều" },
          { label: "Nghi vấn", pattern: "Is there + a/an / any + N?  —  Are there + any + N số nhiều?" },
          { label: "Trả lời ngắn", pattern: "Yes, there is/are. / No, there isn't/aren't." },
          { label: "Hỏi số lượng", pattern: "How many + N số nhiều + are there + ...?" },
        ],
        examples: [
          { en: "There's a bank near my house.", vi: "Có một ngân hàng gần nhà tôi." },
          { en: "There are thirty students in my class.", vi: "Lớp tôi có ba mươi học sinh." },
          { en: "There isn't a TV in my bedroom.", vi: "Trong phòng ngủ của tôi không có TV." },
          { en: "Is there a hospital near here? – Yes, there is.", vi: "Gần đây có bệnh viện không? – Có." },
          { en: "Are there any eggs in the fridge? – No, there aren't.", vi: "Trong tủ lạnh có quả trứng nào không? – Không có." },
          { en: "How many people are there in your family? – There are four.", vi: "Gia đình bạn có mấy người? – Có bốn người." },
        ],
      },
      {
        heading: "Dùng với a / an / some / any",
        table: {
          head: ["", "Danh từ đếm được số ít", "Danh từ số nhiều", "Danh từ không đếm được"],
          rows: [
            ["Khẳng định", "There's a cat.", "There are some cats.", "There's some milk."],
            ["Phủ định", "There isn't a cat.", "There aren't any cats.", "There isn't any milk."],
            ["Câu hỏi", "Is there a cat?", "Are there any cats?", "Is there any milk?"],
          ],
        },
        points: [
          "some: dùng trong câu khẳng định.",
          "any: dùng trong câu phủ định và câu hỏi.",
          "Cũng có thể phủ định bằng “no”: There are no shops here. = There aren't any shops here.",
        ],
        examples: [
          { en: "There is some water in the bottle.", vi: "Trong chai có một ít nước." },
          { en: "There aren't any shops in this street.", vi: "Trên con phố này không có cửa hàng nào." },
        ],
      },
      {
        heading: "Lưu ý quan trọng",
        points: [
          "Câu trả lời ngắn khẳng định không viết tắt: “Yes, there is.” (không nói “Yes, there's.”).",
          "Khi liệt kê nhiều thứ, động từ thường chia theo danh từ đứng ngay sau nó: There is a table and two chairs. / There are two chairs and a table.",
          "Dùng “there is” để giới thiệu vật lần đầu, sau đó dùng “it” / “they” để nói tiếp về nó.",
        ],
        examples: [
          { en: "There's a cat in the garden. It's very small.", vi: "Có một con mèo trong vườn. Nó rất nhỏ." },
          { en: "There is a table and two chairs in the kitchen.", vi: "Trong bếp có một cái bàn và hai cái ghế." },
        ],
      },
    ],
    mistakes: [
      {
        wrong: "Have a book on the table.",
        right: "There is a book on the table.",
        why: "Để nói “có” (tồn tại ở đâu đó), tiếng Anh dùng “there is/are”, không dùng “have”.",
      },
      {
        wrong: "There is two cats in the garden.",
        right: "There are two cats in the garden.",
        why: "“two cats” là số nhiều nên dùng “there are”.",
      },
      {
        wrong: "There are some milk in the fridge.",
        right: "There is some milk in the fridge.",
        why: "“milk” không đếm được nên chia số ít: “there is”.",
      },
      {
        wrong: "There aren't some chairs.",
        right: "There aren't any chairs.",
        why: "Câu phủ định dùng “any”, không dùng “some”.",
      },
      {
        wrong: "Is there a bank near here? – Yes, there's.",
        right: "Is there a bank near here? – Yes, there is.",
        why: "Câu trả lời ngắn khẳng định không được viết tắt.",
      },
    ],
    exercises: [
      {
        kind: "choice",
        question: "There ___ a big park in my town.",
        options: ["is", "are", "have", "has"],
        answer: 0,
        explain: "“a big park” là số ít → There is. Không dùng “have/has” để nói “có” theo nghĩa tồn tại.",
      },
      {
        kind: "choice",
        question: "There ___ three bedrooms in our flat.",
        options: ["is", "be", "are", "has"],
        answer: 2,
        explain: "“three bedrooms” là số nhiều → There are.",
      },
      {
        kind: "choice",
        question: "There isn't ___ milk in the fridge.",
        options: ["some", "a", "many", "any"],
        answer: 3,
        explain: "Câu phủ định với danh từ không đếm được dùng “any”. “a” và “many” không dùng với “milk” vì milk không đếm được.",
      },
      {
        kind: "choice",
        question: "___ any good restaurants near here?",
        options: ["Is there", "Are there", "There are", "Have there"],
        answer: 1,
        explain: "“restaurants” là số nhiều, câu hỏi đảo “are” lên trước “there”: Are there any...?",
      },
      {
        kind: "choice",
        question: "There's a dog in the garden. ___ very friendly.",
        options: ["There's", "Its", "It's", "There is"],
        answer: 2,
        explain: "Con chó đã được giới thiệu, câu sau nói về đặc điểm của nó nên dùng “It's” (= It is). “Its” là “của nó”.",
      },
      {
        kind: "fill",
        question: "___ any apples in the basket?",
        hint: "there + be",
        answers: ["Are there"],
        explain: "“apples” là số nhiều → câu hỏi: Are there any...?",
      },
      {
        kind: "fill",
        question: "There ___ a sofa in the living room, only two chairs.",
        hint: "not be",
        answers: ["isn't", "is not"],
        explain: "“a sofa” là số ít → phủ định: There isn't (is not) a sofa.",
      },
      {
        kind: "fill",
        question: "How many students ___ in your class?",
        hint: "there + be",
        answers: ["are there"],
        explain: "Hỏi số lượng: How many + danh từ số nhiều + are there...?",
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // 8. PREPOSITIONS IN / ON / AT
  // ---------------------------------------------------------------------------
  {
    id: "a1-prepositions",
    level: "A1",
    title: "Giới từ in / on / at (thời gian và nơi chốn)",
    titleEn: "Prepositions of time and place: in / on / at",
    summary:
      "Phân biệt in, on, at khi nói về thời gian (giờ, ngày, tháng, năm...) và nơi chốn (trong, trên, tại), cùng những trường hợp không dùng giới từ.",
    sections: [
      {
        heading: "Ý tưởng chung",
        text:
          "Tiếng Việt chỉ dùng “lúc, vào, ở, trong, trên”, còn tiếng Anh chia ra in / on / at theo quy tắc khá rõ. Mẹo nhớ: at = một điểm, on = bề mặt / một ngày, in = bên trong / một khoảng thời gian dài.",
      },
      {
        heading: "Giới từ chỉ thời gian",
        table: {
          head: ["Giới từ", "Dùng với", "Ví dụ"],
          rows: [
            ["at", "Giờ, thời điểm cụ thể", "at 7 o'clock, at 6:30, at noon, at midnight, at night"],
            ["at", "Dịp lễ (cả kỳ nghỉ), một số cụm cố định", "at Christmas, at the moment, at the weekend (Anh–Anh)"],
            ["on", "Thứ trong tuần, ngày tháng, ngày cụ thể", "on Monday, on 5 May, on my birthday, on Christmas Day, on Sunday morning"],
            ["in", "Tháng, năm, mùa, thế kỷ", "in June, in 2024, in summer, in the 21st century"],
            ["in", "Các buổi trong ngày", "in the morning, in the afternoon, in the evening (nhưng: at night)"],
          ],
        },
        points: [
          "Anh–Mỹ nói “on the weekend”, Anh–Anh nói “at the weekend”; cả hai đều đúng.",
          "Buổi của một ngày cụ thể dùng on: on Monday morning, on Friday evening.",
        ],
        examples: [
          { en: "I get up at 6 o'clock.", vi: "Tôi thức dậy lúc 6 giờ." },
          { en: "We have English on Monday and Thursday.", vi: "Chúng tôi học tiếng Anh vào thứ Hai và thứ Năm." },
          { en: "My birthday is in October.", vi: "Sinh nhật tôi vào tháng Mười." },
          { en: "I don't drink coffee at night.", vi: "Tôi không uống cà phê vào ban đêm." },
        ],
      },
      {
        heading: "Không dùng giới từ chỉ thời gian",
        points: [
          "Trước next, last, this, every: next week, last Monday, this morning, every day.",
          "Trước today, tomorrow, yesterday, tonight.",
          "Nói “See you next Friday.” — không nói “on next Friday”.",
        ],
        examples: [
          { en: "I play tennis every Saturday.", vi: "Tôi chơi quần vợt mỗi thứ Bảy." },
          { en: "We're busy this week.", vi: "Tuần này chúng tôi bận." },
        ],
      },
      {
        heading: "Giới từ chỉ nơi chốn",
        table: {
          head: ["Giới từ", "Dùng với", "Ví dụ"],
          rows: [
            ["in", "Bên trong một không gian (có giới hạn xung quanh)", "in the room, in the box, in the garden, in a car, in a taxi"],
            ["in", "Thành phố, quốc gia", "in Hanoi, in Vietnam, in London"],
            ["on", "Trên bề mặt", "on the table, on the wall, on the floor"],
            ["on", "Phương tiện công cộng, tầng, bên trái/phải", "on the bus, on the train, on a plane, on the second floor, on the left"],
            ["at", "Một điểm, một địa điểm cụ thể", "at the bus stop, at the door, at the station"],
            ["at", "Nơi diễn ra hoạt động, sự kiện; địa chỉ có số nhà", "at home, at work, at school, at a party, at 25 Le Loi Street"],
          ],
        },
        points: [
          "Ô tô, taxi dùng in (in a car); xe buýt, tàu, máy bay dùng on (on the bus).",
          "“at home” — không nói “at the home” hay “in home”. Nhưng “go home” không có giới từ.",
        ],
        examples: [
          { en: "The keys are on the table.", vi: "Chìa khóa ở trên bàn." },
          { en: "My parents live in Da Nang.", vi: "Bố mẹ tôi sống ở Đà Nẵng." },
          { en: "He's at work now.", vi: "Bây giờ anh ấy đang ở chỗ làm." },
          { en: "There's a picture on the wall.", vi: "Có một bức tranh trên tường." },
          { en: "We are on the bus.", vi: "Chúng tôi đang ở trên xe buýt." },
        ],
      },
    ],
    mistakes: [
      {
        wrong: "I have a meeting in Monday.",
        right: "I have a meeting on Monday.",
        why: "Thứ trong tuần dùng “on”.",
      },
      {
        wrong: "I study at the morning.",
        right: "I study in the morning.",
        why: "Các buổi trong ngày (morning, afternoon, evening) dùng “in the”.",
      },
      {
        wrong: "I often read in night.",
        right: "I often read at night.",
        why: "“night” là ngoại lệ: dùng “at night”, không có “the”.",
      },
      {
        wrong: "See you on next week.",
        right: "See you next week.",
        why: "Trước next / last / this / every không dùng giới từ.",
      },
      {
        wrong: "I'm in home now.",
        right: "I'm at home now.",
        why: "Cụm cố định là “at home”.",
      },
    ],
    exercises: [
      {
        kind: "choice",
        question: "The film starts ___ 8 p.m.",
        options: ["in", "on", "at"],
        answer: 2,
        explain: "Giờ cụ thể dùng “at”.",
      },
      {
        kind: "choice",
        question: "I was born ___ July.",
        options: ["at", "in", "on"],
        answer: 1,
        explain: "Tháng dùng “in”. (Nếu có ngày cụ thể như “on 5 July” thì mới dùng “on”.)",
      },
      {
        kind: "choice",
        question: "We don't go to school ___ Sunday.",
        options: ["on", "in", "at"],
        answer: 0,
        explain: "Thứ trong tuần dùng “on”.",
      },
      {
        kind: "choice",
        question: "Your phone is ___ the table.",
        options: ["in", "on", "at", "to"],
        answer: 1,
        explain: "Đồ vật nằm trên bề mặt cái bàn → “on”.",
      },
      {
        kind: "choice",
        question: "I'll call you ___.",
        options: ["on next Friday", "in next Friday", "at next Friday", "next Friday"],
        answer: 3,
        explain: "Trước “next” không dùng giới từ: next Friday.",
      },
      {
        kind: "fill",
        question: "We often go swimming ___ summer.",
        hint: "in / on / at",
        answers: ["in"],
        explain: "Mùa trong năm dùng “in”: in summer.",
      },
      {
        kind: "fill",
        question: "My dad isn't at work today. He's ___ home.",
        hint: "in / on / at",
        answers: ["at"],
        explain: "Cụm cố định “at home” (ở nhà).",
      },
      {
        kind: "fill",
        question: "My birthday is ___ 15 May.",
        hint: "in / on / at",
        answers: ["on"],
        explain: "Ngày tháng cụ thể dùng “on”. Chỉ có tháng (in May) mới dùng “in”.",
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // 9. CAN / CAN'T
  // ---------------------------------------------------------------------------
  {
    id: "a1-can",
    level: "A1",
    title: "Can / can't",
    titleEn: "Can / can't",
    summary:
      "Dùng can / can't để nói về khả năng (biết / không biết làm gì), xin phép và nhờ ai đó làm gì; cách viết câu khẳng định, phủ định và câu hỏi.",
    sections: [
      {
        heading: "Can là gì?",
        text:
          "“Can” là động từ khuyết thiếu (modal verb), nghĩa là “có thể, biết (làm gì)”. Nó luôn đi kèm một động từ nguyên mẫu phía sau.",
        points: [
          "Khả năng: I can swim. (Tôi biết bơi.)",
          "Xin phép: Can I open the window? (Tôi mở cửa sổ được không?)",
          "Nhờ / yêu cầu: Can you help me, please? (Bạn giúp tôi được không?)",
          "Cho phép / không cho phép: You can sit here. You can't park here.",
          "Đề nghị giúp đỡ: Can I help you?",
        ],
      },
      {
        heading: "Công thức",
        formulas: [
          { label: "Khẳng định", pattern: "S + can + V" },
          { label: "Phủ định", pattern: "S + cannot / can't + V" },
          { label: "Nghi vấn", pattern: "Can + S + V?" },
          { label: "Trả lời ngắn", pattern: "Yes, S + can. / No, S + can't." },
          { label: "Câu hỏi Wh-", pattern: "Wh- + can + S + V?" },
        ],
        points: [
          "“can” giống nhau với mọi chủ ngữ: I can, she can, they can (không thêm -s).",
          "Sau “can” là động từ nguyên mẫu KHÔNG có “to” và không thêm -s/-ing: She can dance.",
          "Không dùng do/does với “can”: Can you drive? (không nói “Do you can drive?”).",
          "Dạng phủ định đầy đủ thường viết liền: cannot.",
        ],
      },
      {
        heading: "Nói về khả năng",
        examples: [
          { en: "I can swim, but I can't dive.", vi: "Tôi biết bơi nhưng không biết lặn." },
          { en: "She can speak three languages.", vi: "Cô ấy nói được ba thứ tiếng." },
          { en: "My grandfather can't use a smartphone.", vi: "Ông tôi không biết dùng điện thoại thông minh." },
          { en: "Can you drive? – Yes, I can.", vi: "Bạn có biết lái xe không? – Có, tôi biết." },
          { en: "What languages can you speak?", vi: "Bạn nói được những thứ tiếng nào?" },
        ],
      },
      {
        heading: "Xin phép và nhờ vả",
        points: [
          "Xin phép: Can I + V...?",
          "Nhờ người khác: Can you + V...? Thêm “please” cho lịch sự.",
          "“Could you...?” lịch sự hơn “Can you...?” (sẽ học kỹ ở trình độ sau).",
          "Cách đáp: Sure. / Of course. / Yes, you can. / Sorry, you can't.",
        ],
        examples: [
          { en: "Can I use your phone? – Sure.", vi: "Tôi dùng điện thoại của bạn được không? – Được chứ." },
          { en: "Can you help me, please?", vi: "Bạn giúp tôi với được không?" },
          { en: "You can't take photos in the museum.", vi: "Bạn không được chụp ảnh trong bảo tàng." },
        ],
      },
      {
        heading: "Lưu ý phát âm",
        points: [
          "Trong câu khẳng định, “can” thường đọc nhẹ /kən/: I can swim.",
          "“can't” đọc rõ và mạnh: /kɑːnt/ (Anh–Anh) hoặc /kænt/ (Anh–Mỹ). Hãy nghe kỹ âm “t” và độ nhấn để phân biệt.",
          "Trong câu trả lời ngắn, “can” đọc rõ /kæn/: Yes, I can.",
        ],
      },
    ],
    mistakes: [
      {
        wrong: "She cans swim.",
        right: "She can swim.",
        why: "“can” không bao giờ thêm -s, kể cả với he/she/it.",
      },
      {
        wrong: "I can to speak English.",
        right: "I can speak English.",
        why: "Sau “can” là động từ nguyên mẫu không có “to”.",
      },
      {
        wrong: "He can plays the guitar.",
        right: "He can play the guitar.",
        why: "Động từ sau “can” luôn ở dạng nguyên mẫu, không thêm -s.",
      },
      {
        wrong: "Do you can drive?",
        right: "Can you drive?",
        why: "Câu hỏi với “can” chỉ cần đảo “can” lên trước chủ ngữ, không dùng do/does.",
      },
      {
        wrong: "I don't can cook.",
        right: "I can't cook.",
        why: "Phủ định của “can” là “cannot / can't”, không dùng “don't”.",
      },
    ],
    exercises: [
      {
        kind: "choice",
        question: "My little brother ___ read yet. He's only three.",
        options: ["can", "can't", "cans", "doesn't can"],
        answer: 1,
        explain: "Em bé ba tuổi chưa biết đọc → phủ định “can't”. “cans” và “doesn't can” đều sai ngữ pháp.",
      },
      {
        kind: "choice",
        question: "___ you speak Chinese?",
        options: ["Are", "Does", "Is", "Can"],
        answer: 3,
        explain: "Câu hỏi về khả năng: Can + S + V? “Does” sai vì chủ ngữ là “you”; “Are/Is” không đi với động từ nguyên mẫu “speak”.",
      },
      {
        kind: "choice",
        question: "She can ___ very well.",
        options: ["dances", "to dance", "dance", "dancing"],
        answer: 2,
        explain: "Sau “can” là động từ nguyên mẫu không “to”: can dance.",
      },
      {
        kind: "choice",
        question: "Can I use your pen? – Yes, ___.",
        options: ["you can", "I can", "you can't", "can you"],
        answer: 0,
        explain: "Người hỏi xin phép (Can I...?), người trả lời cho phép: “Yes, you can.”",
      },
      {
        kind: "choice",
        question: "You ___ smoke here. It's a hospital.",
        options: ["can", "don't can", "cans", "can't"],
        answer: 3,
        explain: "Ở bệnh viện không được hút thuốc → “can't” (không được phép).",
      },
      {
        kind: "fill",
        question: "I'm sorry, I ___ come to your party on Saturday.",
        hint: "can, phủ định",
        answers: ["can't", "cannot", "can not"],
        explain: "Phủ định của “can” là “cannot” hoặc viết tắt “can't”.",
      },
      {
        kind: "fill",
        question: "My grandmother is 80, but she ___ very fast.",
        hint: "can / walk",
        answers: ["can walk"],
        explain: "can + động từ nguyên mẫu: can walk (không thêm -s vào “walk”).",
      },
      {
        kind: "fill",
        question: "What languages ___ speak?",
        hint: "can / you",
        answers: ["can you"],
        explain: "Câu hỏi Wh- với can: Wh- + can + S + V? → What languages can you speak?",
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // 10. QUESTIONS
  // ---------------------------------------------------------------------------
  {
    id: "a1-questions",
    level: "A1",
    title: "Câu hỏi Yes/No và câu hỏi Wh-",
    titleEn: "Yes/No questions and Wh- questions",
    summary:
      "Cách đặt câu hỏi Yes/No bằng cách đảo trợ động từ, và câu hỏi Wh- với what, where, when, who, why, how, how old, how many... đúng trật tự từ.",
    sections: [
      {
        heading: "Hai loại câu hỏi",
        points: [
          "Câu hỏi Yes/No: người nghe trả lời “Yes” hoặc “No”. Khi nói, thường lên giọng ở cuối câu.",
          "Câu hỏi Wh-: hỏi thông tin (cái gì, ở đâu, khi nào...). Bắt đầu bằng từ để hỏi, thường xuống giọng ở cuối câu.",
          "Tiếng Việt chỉ cần thêm “không?” ở cuối câu, còn tiếng Anh phải ĐẢO trợ động từ (be, do/does, can...) lên trước chủ ngữ.",
        ],
      },
      {
        heading: "Câu hỏi Yes/No",
        formulas: [
          { label: "Với to be", pattern: "Am/Is/Are + S + ...?" },
          { label: "Với động từ thường (hiện tại đơn)", pattern: "Do/Does + S + V?" },
          { label: "Với can", pattern: "Can + S + V?" },
          { label: "Hiện tại tiếp diễn", pattern: "Am/Is/Are + S + V-ing?" },
          { label: "Trả lời ngắn", pattern: "Yes, S + trợ động từ. / No, S + trợ động từ + not." },
        ],
        examples: [
          { en: "Are you a student? – Yes, I am.", vi: "Bạn là học sinh à? – Vâng, đúng vậy." },
          { en: "Does he like football? – No, he doesn't.", vi: "Anh ấy có thích bóng đá không? – Không." },
          { en: "Can you swim? – Yes, I can.", vi: "Bạn biết bơi không? – Có, tôi biết." },
          { en: "Is it raining? – No, it isn't.", vi: "Trời có đang mưa không? – Không." },
        ],
      },
      {
        heading: "Câu hỏi Wh-: trật tự từ",
        formulas: [
          { label: "Với to be", pattern: "Wh- + am/is/are + S + ...?" },
          { label: "Với động từ thường", pattern: "Wh- + do/does + S + V?" },
          { label: "Với can", pattern: "Wh- + can + S + V?" },
          { label: "Hiện tại tiếp diễn", pattern: "Wh- + am/is/are + S + V-ing?" },
        ],
        points: [
          "Giữ nguyên trật tự của câu hỏi Yes/No, chỉ thêm từ để hỏi ở đầu: Do you live here? → Where do you live?",
          "Giới từ thường đứng ở cuối câu hỏi: Where are you from? Who do you live with?",
        ],
        examples: [
          { en: "What's your name? – My name is Lan.", vi: "Bạn tên là gì? – Tôi tên Lan." },
          { en: "Where do you live? – I live in Hue.", vi: "Bạn sống ở đâu? – Tôi sống ở Huế." },
          { en: "How old is your sister? – She's twelve.", vi: "Em gái bạn bao nhiêu tuổi? – Em ấy mười hai tuổi." },
          { en: "Why are you late? – Because I missed the bus.", vi: "Sao bạn đến trễ? – Vì tôi bị lỡ xe buýt." },
        ],
      },
      {
        heading: "Các từ để hỏi thường gặp",
        table: {
          head: ["Từ để hỏi", "Hỏi về", "Ví dụ"],
          rows: [
            ["What", "cái gì", "What do you want?"],
            ["What time", "mấy giờ", "What time do you get up?"],
            ["Where", "ở đâu", "Where is the bank?"],
            ["When", "khi nào", "When is your birthday?"],
            ["Who", "ai", "Who is that man?"],
            ["Whose", "của ai", "Whose bag is this?"],
            ["Which", "cái nào (trong số lựa chọn)", "Which colour do you like, red or blue?"],
            ["Why", "tại sao (trả lời bằng Because...)", "Why are you sad?"],
            ["How", "như thế nào, bằng cách nào", "How are you? / How do you go to school?"],
            ["How old", "bao nhiêu tuổi", "How old are you?"],
            ["How many", "bao nhiêu (danh từ đếm được số nhiều)", "How many brothers do you have?"],
            ["How much", "bao nhiêu (không đếm được) / giá tiền", "How much is this shirt?"],
            ["How often", "bao lâu một lần", "How often do you play sports?"],
          ],
        },
      },
      {
        heading: "Khi Who / What là chủ ngữ",
        text:
          "Nếu từ để hỏi chính là chủ ngữ (hỏi “ai làm việc đó?”), ta KHÔNG dùng do/does, và động từ chia như với he/she/it.",
        table: {
          head: ["Hỏi về chủ ngữ (không có do/does)", "Hỏi về tân ngữ (có do/does)"],
          rows: [
            ["Who lives in this house? – Mr Nam lives there.", "Who do you live with? – I live with my parents."],
            ["Who teaches you English? – Ms Hoa does.", "Who does Ms Hoa teach? – She teaches our class."],
          ],
        },
        examples: [
          { en: "Who lives in this house?", vi: "Ai sống trong ngôi nhà này?" },
          { en: "How many students are there in your class?", vi: "Lớp bạn có bao nhiêu học sinh?" },
        ],
      },
    ],
    mistakes: [
      {
        wrong: "Where you live?",
        right: "Where do you live?",
        why: "Câu hỏi với động từ thường cần trợ động từ do/does sau từ để hỏi.",
      },
      {
        wrong: "What your name is?",
        right: "What is your name?",
        why: "Trong câu hỏi, “is” phải đảo lên trước chủ ngữ “your name”.",
      },
      {
        wrong: "Does she likes cats?",
        right: "Does she like cats?",
        why: "Sau “Does”, động từ chính giữ nguyên mẫu.",
      },
      {
        wrong: "How many old are you?",
        right: "How old are you?",
        why: "Hỏi tuổi dùng “How old”, không dùng “How many”.",
      },
      {
        wrong: "Who does live here?",
        right: "Who lives here?",
        why: "Khi “Who” là chủ ngữ thì không dùng “does”; động từ thêm -s như với he/she.",
      },
    ],
    exercises: [
      {
        kind: "choice",
        question: "___ do you live? – In Ho Chi Minh City.",
        options: ["What", "Where", "When", "Who"],
        answer: 1,
        explain: "Câu trả lời là một địa điểm → hỏi bằng “Where”.",
      },
      {
        kind: "choice",
        question: "___ is your birthday? – It's on 3 March.",
        options: ["When", "Where", "Who", "Why"],
        answer: 0,
        explain: "Câu trả lời là một ngày → hỏi thời gian bằng “When”.",
      },
      {
        kind: "choice",
        question: "How ___ brothers do you have?",
        options: ["much", "old", "many", "often"],
        answer: 2,
        explain: "“brothers” là danh từ đếm được số nhiều → How many. “How much” dùng cho danh từ không đếm được.",
      },
      {
        kind: "choice",
        question: "Câu hỏi nào đúng?",
        options: ["Where does she works?", "Where she works?", "Where is she work?", "Where does she work?"],
        answer: 3,
        explain: "Trật tự đúng: Wh- + does + S + V nguyên mẫu. Sau “does” không thêm -s vào động từ.",
      },
      {
        kind: "choice",
        question: "___ bag is this? – It's Nam's.",
        options: ["Who", "Whose", "Who's", "What"],
        answer: 1,
        explain: "Câu trả lời nói chủ sở hữu (của Nam) → hỏi “Whose” (của ai). “Who's” = Who is.",
      },
      {
        kind: "fill",
        question: "___ old is your grandfather? – He's 75.",
        hint: "từ để hỏi",
        answers: ["How"],
        explain: "Hỏi tuổi: How old + be + S?",
      },
      {
        kind: "fill",
        question: "___ you like pizza? – Yes, I do.",
        hint: "trợ động từ",
        answers: ["Do"],
        explain: "Câu trả lời “Yes, I do” cho thấy câu hỏi dùng trợ động từ “Do” với chủ ngữ “you”.",
      },
      {
        kind: "fill",
        question: "Why ___ crying? – Because she's sad.",
        hint: "she / be",
        answers: ["is she"],
        explain: "Câu hỏi hiện tại tiếp diễn: Wh- + is + she + V-ing → Why is she crying?",
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // 11. COUNTABLE / UNCOUNTABLE
  // ---------------------------------------------------------------------------
  {
    id: "a1-countable",
    level: "A1",
    title: "Danh từ đếm được và không đếm được",
    titleEn: "Countable and uncountable nouns",
    summary:
      "Phân biệt danh từ đếm được và không đếm được; cách dùng some / any, much / many / a lot of, và cách hỏi How much / How many.",
    sections: [
      {
        heading: "Đếm được và không đếm được",
        points: [
          "Danh từ đếm được: đếm được từng cái, có dạng số ít và số nhiều: an apple, two apples, a chair, three chairs.",
          "Danh từ không đếm được: chất lỏng, chất liệu, đồ ăn dạng khối/hạt, khái niệm: water, milk, rice, sugar, bread, money, time, music, information, advice, homework, news.",
          "Danh từ không đếm được KHÔNG đi với a/an, KHÔNG thêm -s, và động từ chia số ít: The water is cold.",
          "Một số từ có thể vừa đếm được vừa không, với nghĩa khác nhau: a chicken (con gà) / chicken (thịt gà).",
        ],
        table: {
          head: ["", "Đếm được", "Không đếm được"],
          rows: [
            ["Ví dụ", "a book, two books", "water, rice, money"],
            ["Dùng với a/an", "Có (số ít): a book", "Không: không nói “a water”"],
            ["Có số nhiều", "Có: books", "Không: không nói “waters, monies”"],
            ["Động từ", "is (số ít) / are (số nhiều)", "is"],
          ],
        },
      },
      {
        heading: "Đo lường danh từ không đếm được",
        text: "Muốn “đếm” danh từ không đếm được, ta dùng từ chỉ đơn vị: số + đơn vị + of + danh từ.",
        points: [
          "a glass of water, a cup of coffee, a bottle of milk.",
          "a piece of cake / bread / advice, a slice of bread.",
          "a kilo of rice, a bowl of rice, a bag of sugar.",
          "Số nhiều thì thêm -s vào từ chỉ đơn vị: two glasses of water, three bottles of milk.",
          "Trong nhà hàng, quán cà phê, người ta vẫn nói ngắn gọn “two coffees, please” (= hai cốc cà phê).",
        ],
        examples: [
          { en: "I'd like a glass of water, please.", vi: "Làm ơn cho tôi một cốc nước." },
          { en: "Can you give me some advice?", vi: "Bạn có thể cho tôi lời khuyên được không?" },
        ],
      },
      {
        heading: "Some và any",
        formulas: [
          { label: "Khẳng định", pattern: "some + N số nhiều / N không đếm được" },
          { label: "Phủ định", pattern: "not + any + N số nhiều / N không đếm được" },
          { label: "Câu hỏi", pattern: "any + N số nhiều / N không đếm được?" },
        ],
        points: [
          "some (một vài, một ít) thường dùng trong câu khẳng định.",
          "any thường dùng trong câu phủ định và câu hỏi.",
          "Ngoại lệ: câu mời và câu xin dùng some: Would you like some tea? Can I have some water?",
        ],
        examples: [
          { en: "There are some apples on the table.", vi: "Có vài quả táo trên bàn." },
          { en: "We need some rice.", vi: "Chúng ta cần một ít gạo." },
          { en: "Is there any milk in the fridge?", vi: "Trong tủ lạnh còn sữa không?" },
          { en: "I don't have any money.", vi: "Tôi không có đồng nào." },
        ],
      },
      {
        heading: "Much, many và a lot of",
        table: {
          head: ["Từ", "Đi với", "Ví dụ"],
          rows: [
            ["many", "Danh từ đếm được số nhiều", "There aren't many cars on the road today."],
            ["much", "Danh từ không đếm được (chủ yếu trong câu phủ định và câu hỏi)", "He doesn't eat much meat."],
            ["a lot of / lots of", "Cả hai loại; thường dùng trong câu khẳng định", "She drinks a lot of water. I have lots of friends."],
          ],
        },
        examples: [
          { en: "There aren't many cars on the road today.", vi: "Hôm nay trên đường không có nhiều xe." },
          { en: "He doesn't eat much meat.", vi: "Anh ấy không ăn nhiều thịt." },
          { en: "She drinks a lot of water.", vi: "Cô ấy uống rất nhiều nước." },
        ],
      },
      {
        heading: "How much và How many",
        formulas: [
          { label: "Hỏi số lượng (đếm được)", pattern: "How many + N số nhiều + ...?" },
          { label: "Hỏi lượng (không đếm được)", pattern: "How much + N không đếm được + ...?" },
          { label: "Hỏi giá", pattern: "How much + is/are + ...?" },
        ],
        examples: [
          { en: "How many children do you have?", vi: "Bạn có mấy người con?" },
          { en: "How much sugar do you want?", vi: "Bạn muốn bao nhiêu đường?" },
          { en: "How much is this T-shirt? – It's 150,000 dong.", vi: "Cái áo phông này bao nhiêu tiền? – 150.000 đồng." },
          { en: "How much are these shoes?", vi: "Đôi giày này bao nhiêu tiền?" },
        ],
      },
    ],
    mistakes: [
      {
        wrong: "I need some informations.",
        right: "I need some information.",
        why: "“information” không đếm được nên không thêm -s.",
      },
      {
        wrong: "How many money do you have?",
        right: "How much money do you have?",
        why: "“money” không đếm được nên dùng “How much”.",
      },
      {
        wrong: "I eat a bread every morning.",
        right: "I eat some bread every morning.",
        why: "“bread” không đếm được nên không dùng “a”. Có thể nói “some bread” hoặc “a piece / a slice of bread”.",
      },
      {
        wrong: "My homeworks are difficult.",
        right: "My homework is difficult.",
        why: "“homework” không đếm được: không thêm -s và động từ chia số ít.",
      },
      {
        wrong: "I don't have some time.",
        right: "I don't have any time.",
        why: "Câu phủ định dùng “any”, không dùng “some”.",
      },
    ],
    exercises: [
      {
        kind: "choice",
        question: "Can I have ___ water, please?",
        options: ["a", "some", "an", "many"],
        answer: 1,
        explain: "“water” không đếm được nên không dùng a/an hay many. Câu xin dùng “some”.",
      },
      {
        kind: "choice",
        question: "How ___ students are there in your class?",
        options: ["much", "lot", "many", "any"],
        answer: 2,
        explain: "“students” là danh từ đếm được số nhiều → How many.",
      },
      {
        kind: "choice",
        question: "We don't have ___ milk. Let's buy some.",
        options: ["some", "any", "many", "a"],
        answer: 1,
        explain: "Câu phủ định dùng “any”. “many” và “a” không dùng với “milk” vì milk không đếm được.",
      },
      {
        kind: "choice",
        question: "Từ nào là danh từ KHÔNG đếm được?",
        options: ["money", "coin", "banana", "student"],
        answer: 0,
        explain: "“money” (tiền) không đếm được: không nói “two moneys”. Còn “coin” (đồng xu) thì đếm được: two coins.",
      },
      {
        kind: "choice",
        question: "There isn't ___ traffic today.",
        options: ["many", "a", "some", "much"],
        answer: 3,
        explain: "“traffic” (giao thông, xe cộ) không đếm được, câu phủ định → “much”. “many” chỉ đi với danh từ số nhiều.",
      },
      {
        kind: "fill",
        question: "How ___ sugar do you want in your tea?",
        hint: "much / many",
        answers: ["much"],
        explain: "“sugar” không đếm được → How much.",
      },
      {
        kind: "fill",
        question: "There aren't ___ eggs in the fridge.",
        hint: "some / any",
        answers: ["any"],
        explain: "Câu phủ định dùng “any”.",
      },
      {
        kind: "fill",
        question: "I'd like two ___ of orange juice, please.",
        hint: "glass",
        answers: ["glasses"],
        explain: "“juice” không đếm được nên ta đếm bằng đơn vị “glass”. Hai cốc → số nhiều: glasses (glass tận cùng -ss nên thêm -es).",
      },
    ],
  },
];
