# ChemQuest: Thiết Kế Kiến Trúc Visual & UX

## Phân Tích Yêu Cầu
- Đối tượng: Học sinh THPT (15-18 tuổi)
- Mục tiêu: Vừa học vừa chơi, tăng hứng thú
- Nội dung: Hóa học (Cân bằng, Nitrogen-Sulfur, Hữu cơ)
- Tính năng: Nhiệm vụ, mô phỏng, animation, âm thanh, điểm số

---

## Ý Tưởng 1: "Phòng Thí Nghiệm Tương Lai" (Futuristic Lab)
**Phong Cách Thiết Kế:** Cyberpunk + Khoa học viễn tưởng

### Design Movement
Cyberpunk meets educational technology - một thế giới ảo nơi các phân tử và phản ứng hóa học được trực quan hóa dưới dạng năng lượng kỹ thuật số.

### Core Principles
1. **Neon + Glow Effects**: Các yếu tố sáng bóng, phát sáng để tạo cảm giác năng lượng
2. **Grid-based Asymmetry**: Lưới hiện đại nhưng có những phần bất đối xứng để tạo động lực
3. **Data Visualization**: Mọi thứ được biểu diễn dưới dạng dữ liệu, biểu đồ, con số
4. **Interactivity First**: Mọi phần tử đều có phản ứng, gợi cảm giác "sống động"

### Color Philosophy
- **Neon Blue** (#00D9FF) - Chính, năng lượng, tương tác
- **Neon Purple** (#D946EF) - Phản ứng hóa học, sự biến đổi
- **Dark Navy** (#0F172A) - Nền, tạo độ sâu
- **Acid Green** (#CCFF00) - Thành công, hoàn thành
- **Neon Red** (#FF0080) - Cảnh báo, lỗi

### Layout Paradigm
- Sidebar trái hiển thị bản đồ chương (map)
- Khu vực chính: Canvas mô phỏng ở giữa
- Sidebar phải: Thông tin nhiệm vụ, điểm số, combo
- Hiệu ứng parallax khi cuộn

### Signature Elements
1. **Glowing Particles**: Các hạt sáng bay xung quanh khi phản ứng xảy ra
2. **Holographic Cards**: Thẻ nhiệm vụ có hiệu ứng hologram
3. **Circuit Board Patterns**: Các đường kết nối như mạch điện tử

### Interaction Philosophy
- Mọi click đều có phản hồi ngay lập tức (haptic-like)
- Drag & drop có hiệu ứng "từ trường" kéo các phần tử
- Hover tạo hiệu ứng glow xung quanh

### Animation
- Entrance: Các phần tử fade in + scale up với glow effect
- Reaction: Phản ứng hóa học có hiệu ứng nổ nhẹ, tia sáng
- Transition: Mượt mà, 300-500ms, easing: cubic-bezier(0.4, 0, 0.2, 1)
- Particle effects: Hạt sáng bay lên, tan biến

### Typography System
- **Display**: "Space Mono" Bold (tiêu đề chính) - công nghệ, tương lai
- **Heading**: "Poppins" SemiBold 600 (tiêu đề phụ)
- **Body**: "Inter" Regular 400 (nội dung)
- **Code**: "Courier New" (công thức hóa học)

---

## Ý Tưởng 2: "Phòng Thí Nghiệm Cổ Điển" (Vintage Lab)
**Phong Cách Thiết Kế:** Steampunk + Giáo dục cổ điển

### Design Movement
Kết hợp thẩm mỹ steampunk với sách giáo khoa cổ điển - một phòng thí nghiệm từ thế kỷ 19 nhưng với công nghệ hiện đại.

### Core Principles
1. **Warm Tones**: Vàng, nâu, đỏ ấm áp
2. **Ornamental Details**: Các chi tiết trang trí, khung viền cổ điển
3. **Handwritten Elements**: Một số phần tử có vẻ tay viết
4. **Mechanical Metaphor**: Các bánh răng, cơ chế cơ học

### Color Philosophy
- **Warm Brown** (#8B6F47) - Chính, gỗ, tự nhiên
- **Burnt Orange** (#CC5500) - Phản ứng, năng lượng
- **Cream** (#FFF8DC) - Nền, giấy cũ
- **Gold** (#FFD700) - Thành công, giải thưởng
- **Deep Red** (#8B0000) - Cảnh báo

### Layout Paradigm
- Bố cục có khung viền trang trí
- Các "trang sách" để hiển thị nội dung
- Sidebar có vẻ như một "tủ lưu trữ"

### Signature Elements
1. **Gear Decorations**: Bánh răng quay ở các góc
2. **Vintage Badges**: Huy hiệu thành tích kiểu cũ
3. **Handwritten Notes**: Ghi chú tay trên các thẻ

### Interaction Philosophy
- Các phần tử có vẻ "cơ khí", chuyển động như máy
- Click tạo âm thanh như "clic" của máy
- Drag & drop có cảm giác "trọng lượng"

### Animation
- Entrance: Fade in từ từ, có vẻ "xuất hiện"
- Reaction: Quay tròn, rung lắc nhẹ
- Transition: Chậm hơn, 400-600ms, easing: ease-in-out
- Particle: Tia lửa nhỏ, khói nhẹ

### Typography System
- **Display**: "Playfair Display" Bold (tiêu đề) - cổ điển, sang trọng
- **Heading**: "Lora" SemiBold (tiêu đề phụ) - serif, truyền thống
- **Body**: "Crimson Text" Regular (nội dung) - serif, dễ đọc
- **Code**: "Courier" (công thức)

---

## Ý Tưởng 3: "Phòng Thí Nghiệm Tự Nhiên" (Organic Lab)
**Phong Cách Thiết Kế:** Biomorphic + Giáo dục hiện đại

### Design Movement
Thiết kế hữu cơ với các hình dạng tự nhiên, mềm mại - phản ánh bản chất của các phân tử và phản ứng hóa học.

### Core Principles
1. **Curved Shapes**: Không có góc cạnh, mọi thứ mềm mại, tròn
2. **Nature-inspired Colors**: Xanh lá, xanh dương, màu đất
3. **Fluid Animations**: Chuyển động mượt mà, tự nhiên
4. **Minimalist Approach**: Ít chi tiết, tập trung vào bản chất

### Color Philosophy
- **Sage Green** (#9CAF88) - Chính, tự nhiên, bình yên
- **Ocean Blue** (#4A90E2) - Phản ứng, năng lượng
- **Soft Beige** (#F5F1E8) - Nền, nhẹ nhàng
- **Mint** (#A8E6CF) - Thành công, tươi mới
- **Coral** (#FF6B6B) - Cảnh báo, năng lượng

### Layout Paradigm
- Bố cục tự do, không lưới cứng nhắc
- Các phần tử "trôi nổi" trên nền
- Sử dụng wave patterns, blob shapes

### Signature Elements
1. **Blob Shapes**: Các hình dạng không định hình, mềm mại
2. **Wave Dividers**: Các đường sóng chia tách các phần
3. **Organic Icons**: Icon có vẻ vẽ tay, tự nhiên

### Interaction Philosophy
- Mọi thứ chuyển động mượt mà, như nước chảy
- Hover tạo hiệu ứng "sóng" lan tỏa
- Drag & drop có cảm giác "nhẹ nhàng"

### Animation
- Entrance: Fade in + scale up mượt mà
- Reaction: Sóng lan tỏa, bong bóng nổ
- Transition: Mượt mà, 350-450ms, easing: cubic-bezier(0.25, 0.46, 0.45, 0.94)
- Particle: Bong bóng nhỏ, nước bắn

### Typography System
- **Display**: "Sora" Bold (tiêu đề) - hiện đại, tròn
- **Heading**: "Outfit" SemiBold (tiêu đề phụ) - hình học, sạch sẽ
- **Body**: "Sora" Regular (nội dung) - dễ đọc, hiện đại
- **Code**: "IBM Plex Mono" (công thức)

---

## Lựa Chọn Cuối Cùng

**Được chọn: Ý Tưởng 1 - "Phòng Thí Nghiệm Tương Lai" (Futuristic Lab)**

### Lý Do Chọn
1. **Phù hợp độ tuổi**: Học sinh THPT yêu thích công nghệ, cyberpunk, sci-fi
2. **Tương tác cao**: Neon glow, particles, glitch effects tạo cảm giác "sống động"
3. **Dễ phân biệt**: Neon colors giúp phân biệt rõ các yếu tố, phản ứng
4. **Animation phong phú**: Cyberpunk cho phép nhiều hiệu ứng mạnh mẽ
5. **Hệ thống điểm số**: Dễ biểu diễn dưới dạng "năng lượng", "dữ liệu"

### Quyết Định Thiết Kế
- **Neon Blue (#00D9FF)** làm màu chính
- **Dark Navy (#0F172A)** làm nền
- **Neon Purple (#D946EF)** cho phản ứng hóa học
- **Acid Green (#CCFF00)** cho thành công
- **Space Mono** cho tiêu đề (công nghệ)
- **Inter** cho nội dung (dễ đọc)
- Sidebar layout: Bản đồ chương (trái) + Canvas (giữa) + Info (phải)
- Hiệu ứng: Glow, particles, glitch, parallax

---

## Kiến Trúc Hệ Thống

### Cấu Trúc Dữ Liệu
```
chapters/
  ├── chapter1: Cân bằng hóa học
  │   ├── missions: [mission1, mission2, ...]
  │   └── progress: { completed, score, time }
  ├── chapter2: Nitrogen-Sulfur
  └── chapter3: Hữu cơ

missions/
  ├── id, title, description
  ├── objectives: [obj1, obj2, ...]
  ├── simulation: { type, elements, conditions }
  ├── scoring: { points, accuracy, timeBonus }
  └── status: { completed, attempts, bestScore }

simulation/
  ├── dragDropElements: [H2O, HCl, NaOH, ...]
  ├── conditions: { temperature, solvent, pH }
  ├── reactions: [{ reactants, products, animation }]
  └── feedback: { correct, error, hint }
```

### Hệ Thống Điểm Số
- Base points: 100 điểm/nhiệm vụ
- Accuracy bonus: +0-50 điểm (độ chính xác)
- Time bonus: +0-30 điểm (hoàn thành nhanh)
- Combo: x1.5 nếu 3 nhiệm vụ liên tiếp đúng
- Total: Base + Accuracy + Time + Combo

### Hệ Thống Animation
- Reaction: Phản ứng hóa học → glow + particles + color change
- Success: Acid green flash + upward particles + sound
- Error: Red glitch + shake + error sound
- Transition: Fade + scale với easing cubic-bezier

