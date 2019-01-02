// カレンダーへイベントを登録する
function getsheet() {
    
  // 変数定義
  var sht, i, name, event_day, start_time, added;
  var start_hour, minute
  
  //------------------------
  // 【個別設定】
  //------------------------
  // スケジュールシート名
  var SHEET_NAME = "シート１"
  // 登録するGoogleカレンダーの所有者メールアドレス
  // [所有者のメールアドレス] に実際のアドレスを追加してください
  var GOOGLE_CALENDAR_ACCOUNT = "[所有者のメールアドレス]" //★
  
  // スケジュール開始行を指定
  var SCHEDULE_START_ROW = 2 //★

  // 列を指定
  var NAME_COL = 1
  var EVENT_DAY_COL = 2
  var START_TIME_COL = 3
  var IS_ADD_CALENDAR_COL = 4
    
  // カレンダースケジュールの背景色
  var SCHEDULE_BACKGROUND_COLOR = 0
  // 0 : カレンダーの色
  // 1 : ラベンダー（薄紫）
  // 2 : セージ（水色）
  // 3 : ぶどう（紫）
  // 4 : フラミンゴ（ピンク）
  // 5 : バナナ（黄色）
  // 6 : ミカン（オレンジ）
  // 7 : ピーコック（ターコイズブルー）
  // 8 : グラファイト（グレー）
  // 9 : ブルーベリー（青）
  // 10: バジル（緑）
  // 11: トマト（赤）
  
  // 登録済みを示す文字列
  var INDICATE_REGISTERED = "登録完了"
  
  //-------------------------
  

  // シートを定義
  sht = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
  
  // シートの2行目 〜 最終行まで処理を繰り返す
  for(i = SCHEDULE_START_ROW; i <= sht.getLastRow(); i++) {

    // スプレッドシートから必要データを取得
    name = sht.getRange(i, NAME_COL).getValue();
    event_day = sht.getRange(i, EVENT_DAY_COL).getValue();
    
    start_time = sht.getRange(i, START_TIME_COL).getValue();
    
    start_hour = start_time.getHours();
    minute = toDoubleDigits(start_time.getMinutes());
   
    // スケジュールに登録するタイトル
    var SCHEDULE_TITILE = "【" + name + "さん】" + start_hour + ":" + minute + "～"
    
    // カレンダーへ登録
    event_title = SCHEDULE_TITILE
    
    // i行6列目の値(イベント登録有無)をaddedへ格納
    added = sht.getRange(i, IS_ADD_CALENDAR_COL).getValue();

    // addedの値が空白だったらカレンダー登録を実行
    if(added == "") {
      Cal = CalendarApp.getCalendarById(GOOGLE_CALENDAR_ACCOUNT)
      // カレンダーへインベント登録
      var newEvent = Cal.createAllDayEvent(event_title, new Date(event_day));
      newEvent.setColor(SCHEDULE_BACKGROUND_COLOR);
      
      // カレンダー登録済みの旨を記入
      sht.getRange(i, IS_ADD_CALENDAR_COL).setValue(INDICATE_REGISTERED);
      
    }
　}
}

// 時間が一桁の場合は頭に0を付ける
function toDoubleDigits(num) {
  num += "";
  if (num.length === 1) {
    num = "0" + num;
  }
 return num;     
};