/**
 * js/finish.js
 * 
 * このスクリプトは、終了ボタン（クラス名 "finish"）がクリックされた際に、
 * 当日の日付をキーとして、各ページの終了ボタンが押された記録を localStorage に保存します。
 * 同じページで複数回クリックされても、1 回分として記録します。
 *
 * 各終了ボタンのあるページでこのスクリプトを読み込んでください。
 */

/**
 * 指定した年、月、日の文字列キーを生成するヘルパー関数
 * 例: 2025年2月9日 → "2025-02-09"
 * @param {number} year - 年
 * @param {number} month - 月（0～11。0が1月、11が12月）
 * @param {number} day - 日
 * @returns {string} 日付キー
 */
function getDateKey(year, month, day) {
    return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

document.addEventListener('DOMContentLoaded', () => {
    const finishBtn = document.querySelector('.finish');
    if (finishBtn) {
        finishBtn.addEventListener('click', (event) => {
            // 遷移を防ぐためにデフォルトのリンク動作をキャンセル
            event.preventDefault();

            // 現在の日付を取得し、日付キーを生成
            const now = new Date();
            const dateKey = getDateKey(now.getFullYear(), now.getMonth(), now.getDate());

            // ページ識別子として、パス名を利用
            const pageId = window.location.pathname;

            // localStorageから既存のfinishRecordsを取得（存在しない場合は空オブジェクト）
            let records = JSON.parse(localStorage.getItem("finishRecords") || "{}");

            // 当日の日付キーが存在しなければ初期化
            if (!records[dateKey]) {
                records[dateKey] = {};
            }

            // 同じページでのクリックが未記録の場合のみ記録する
            if (!records[dateKey][pageId]) {
                records[dateKey][pageId] = true;
                localStorage.setItem("finishRecords", JSON.stringify(records));
                alert("本日の記録に追加しました");
            } else {
                alert("このページは既に記録済みです");
            }

            // 必要に応じて、ここで次のページへ遷移させるなどの処理を追加できます
        });
    }
});
