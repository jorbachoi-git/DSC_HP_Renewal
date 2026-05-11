/**
 * DONGSUH CHEMICAL (DSC) - QR Code Generator
 * 신제품 "동서 오일 스테인 스프레이" 패키지 인쇄용 QR 코드 생성 스크립트
 * 
 * 실행 방법: node generate-qr.js
 * 결과물: 
 *   - new_product_qr.svg (벡터 방식, 인쇄/디자인용 - 화질 저하 없음)
 *   - new_product_qr.png (이미지 방식, 일반 확인용)
 */

const QRCode = require('qrcode');
const fs = require('fs');
const path = require('path');

// 1. 타겟 URL 설정 (신제품 딥링크 파라미터 포함)
const domain = 'https://www.dsspray.co.kr'; // 실제 도메인 주소 확인 필요
const targetUrl = `${domain}/?product=oil_stain`;

console.log(`QR 코드를 생성합니다: ${targetUrl}`);

// 2. QR 코드 옵션 설정
const options = {
    errorCorrectionLevel: 'H', // 높은 오류 복구 수준 (인쇄 시 일부 훼손되어도 인식 가능)
    type: 'svg',
    margin: 1,
    color: {
        dark: '#000000',  // QR 코드 색상 (검정)
        light: '#FFFFFF'  // 배경 색상 (흰색)
    }
};

// 3. SVG 생성 (인쇄용 - 무손실 벡터)
QRCode.toFile(path.join(__dirname, 'new_product_qr.svg'), targetUrl, options, (err) => {
    if (err) throw err;
    console.log('✅ 인쇄용 SVG 파일 생성 완료: new_product_qr.svg');
});

// 4. PNG 생성 (확인용 - 고해상도)
QRCode.toFile(path.join(__dirname, 'new_product_qr.png'), targetUrl, {
    ...options,
    type: 'png',
    width: 1000 // 충분한 해상도 확보
}, (err) => {
    if (err) throw err;
    console.log('✅ 확인용 PNG 파일 생성 완료: new_product_qr.png');
});
