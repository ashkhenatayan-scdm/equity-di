this.s3 = S3.getInstance("DI_TEMP_FOLDER_" + Session.getActiveUser().getEmail(), "AKIAIBONEIMT3PSBGQKA", 
                         "O5oNNKxdvaN5kWj7G55kY9nrGiyQY58aqXaTMjDb", "scdm-valuation-service.s3.amazonaws.com", 
                         PropertiesService.getUserProperties().getProperty('PATH')); //changing the PATH property we configure the right scope

function onOpen() {
  var PATHKEY = "PATH";
  var PATH = "/financial-instruments/current/";
  
  var userProperties = PropertiesService.getUserProperties();
  userProperties.deleteProperty(PATHKEY);
  userProperties.setProperty(PATHKEY, PATH);
  
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('Data Initialisator')
    .addItem('Load as analyst...', 'loadFileAsAnalyst')
    .addItem('Load as controller...', 'loadFileAsController')
    .addSeparator()
    .addItem('Save back on S3', 'saveBack')
    .addItem('Set Scope', 'setScope')
    .addItem('Show Scope', 'showScope')
    .addToUi();
}

function test() {
  var ROLEKEY = "ROLE";
  var ROLECONTROLLER = "CONTROLLER";
  
  var userProperties = PropertiesService.getUserProperties();
  userProperties.deleteProperty(ROLEKEY);
  userProperties.setProperty(ROLEKEY, ROLECONTROLLER);
  Logger.log("****PATH*****: " + PropertiesService.getUserProperties().getProperty('PATH'));
  //loadFileFromS3("AEA000201011" + '_Equity.json');
  loadFileFromS3("_DELETEME" + '_Equity.json');
}

function loadFileAsController() {
  var ROLEKEY = "ROLE";
  var ROLECONTROLLER = "CONTROLLER";
  
  var ui = SpreadsheetApp.getUi();
  var result = ui.prompt(
      'Please enter the file name (without _Equity.json)',
      ui.ButtonSet.OK_CANCEL);
  
  var button = result.getSelectedButton();
  var text = result.getResponseText();
  if (button == ui.Button.OK) {
    var userProperties = PropertiesService.getUserProperties();
    userProperties.deleteProperty(ROLEKEY);
    userProperties.setProperty(ROLEKEY, ROLECONTROLLER);
    loadFileFromS3(text + '_Equity.json');
  } else if (button == ui.Button.CANCEL) {
  } else if (button == ui.Button.CLOSE) {
  }
}

function loadFileAsAnalyst() {
  var ROLEKEY = "ROLE";
  var ROLEANALYST = "ANALYST";
  
  var ui = SpreadsheetApp.getUi();
  var result = ui.prompt(
      'Please enter the file name (without _Equity.json)',
      ui.ButtonSet.OK_CANCEL);
  
  var button = result.getSelectedButton();
  var text = result.getResponseText();
  if (button == ui.Button.OK) {
    var userProperties = PropertiesService.getUserProperties();
    userProperties.deleteProperty(ROLEKEY);
    userProperties.setProperty(ROLEKEY, ROLEANALYST);
    loadFileFromS3(text + '_Equity.json');
  } else if (button == ui.Button.CANCEL) {
  } else if (button == ui.Button.CLOSE) {
  }
}

function saveBack() {
  /*var properties = PropertiesService.getScriptProperties();
  s3 = properties.getProperty("S3");*/
  
  var VERSIONSHEETNAME = "version";
  var DATASHEETNAME = "data";
  var ROLEKEY = "ROLE";
  var ROLEANALYST = "ANALYST";
  var ROLECONTROLLER = "CONTROLLER";
    
  var versionSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(VERSIONSHEETNAME);
  var dataSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(DATASHEETNAME);
  
  var finalIsin = dataSheet.getRange("C12").getValue();
  finalIsin = finalIsin + "";
  if (finalIsin.length == 0) {
    finalIsin = dataSheet.getRange("B12").getValue();
  }
  finalIsin = finalIsin + "";
  if (finalIsin.length == 0) {
    throw "Isin must not be empty";
  }
  
  var finalType = dataSheet.getRange("C36").getValue();
  finalType = finalType + "";
  if (finalType.length == 0) {
    finalType = dataSheet.getRange("B36").getValue();
  }
  finalType = finalType + "";
  if (finalType.length == 0) {
    throw "Type must not be empty";
  }
  
  dataSheet.getRange("B2").setValue(getCurrentDateTimeString());
  
  var emptyJsonStr = getEmptyJsonTemplate(finalIsin + "_Equity.json");
  var resultJson = JSON.parse(emptyJsonStr);
  
  if (versionSheet.getRange("A1").getValue() === "v2" || versionSheet.getRange("A1").getValue() === "v1") {
    resultJson.version.code = "v2";
  } else {
    throw "Only version v1 and v2 are supported.";
  }
  
  if (versionSheet.getRange("A2").getValue() === "Equity") {
    resultJson.version.type = "Equity";
  } else {
    throw "Only type Equity is supported.";
  }
  
  resultJson.analyst.timestamp_last_change = dataSheet.getRange("B2").getValue();
  resultJson.analyst.analyst = dataSheet.getRange("B3").getValue();
  resultJson.analyst.controller = dataSheet.getRange("B4").getValue();
  
  var asOfDate = getDateStr(dataSheet.getRange("B6").getValue());
  asOfDate = asOfDate + "";
  if (asOfDate.length == 0) {
    throw "As of date must not be empty";
  }
  resultJson.internal_data.as_of_date = asOfDate;
  resultJson.internal_data.internal_id = dataSheet.getRange("B7").getValue();
  resultJson.internal_data.bbg_id = dataSheet.getRange("B8").getValue();
  resultJson.internal_data.reuters_id = dataSheet.getRange("B9").getValue();
  resultJson.internal_data.wm_id = dataSheet.getRange("B10").getValue();
  
  resultJson.id.isin.rule_based = dataSheet.getRange("B12").getValue();
  resultJson.id.isin.manual_override = dataSheet.getRange("C12").getValue();
  resultJson.id.isin.comment = dataSheet.getRange("D12").getValue();
  resultJson.id.isin_2.rule_based = dataSheet.getRange("B13").getValue();
  resultJson.id.isin_2.manual_override = dataSheet.getRange("C13").getValue();
  resultJson.id.isin_2.comment = dataSheet.getRange("D13").getValue();
  resultJson.id.isin_3.rule_based = dataSheet.getRange("B14").getValue();
  resultJson.id.isin_3.manual_override = dataSheet.getRange("C14").getValue();
  resultJson.id.isin_3.comment = dataSheet.getRange("D14").getValue();
  resultJson.id.isin_4.rule_based = dataSheet.getRange("B15").getValue();
  resultJson.id.isin_4.manual_override = dataSheet.getRange("C15").getValue();
  resultJson.id.isin_4.comment = dataSheet.getRange("D15").getValue();
  resultJson.id.isin_5.rule_based = dataSheet.getRange("B16").getValue();
  resultJson.id.isin_5.manual_override = dataSheet.getRange("C16").getValue();
  resultJson.id.isin_5.comment = dataSheet.getRange("D16").getValue();
  resultJson.id.cusip_1.rule_based = dataSheet.getRange("B17").getValue();
  resultJson.id.cusip_1.manual_override = dataSheet.getRange("C17").getValue();
  resultJson.id.cusip_1.comment = dataSheet.getRange("D17").getValue();
  resultJson.id.cusip_2.rule_based = dataSheet.getRange("B18").getValue();
  resultJson.id.cusip_2.manual_override = dataSheet.getRange("C18").getValue();
  resultJson.id.cusip_2.comment = dataSheet.getRange("D18").getValue();
  resultJson.id.cusip_3.rule_based = dataSheet.getRange("B19").getValue();
  resultJson.id.cusip_3.manual_override = dataSheet.getRange("C19").getValue(); 
  resultJson.id.cusip_3.comment = dataSheet.getRange("D19").getValue();
  resultJson.id.cusip_4.rule_based = dataSheet.getRange("B20").getValue();
  resultJson.id.cusip_4.manual_override = dataSheet.getRange("C20").getValue();
  resultJson.id.cusip_4.comment = dataSheet.getRange("D20").getValue();
  resultJson.id.cusip_5.rule_based = dataSheet.getRange("B21").getValue();
  resultJson.id.cusip_5.manual_override = dataSheet.getRange("C21").getValue();
  resultJson.id.cusip_5.comment = dataSheet.getRange("D21").getValue();
  resultJson.id.sedol_1.rule_based = dataSheet.getRange("B22").getValue();
  resultJson.id.sedol_1.manual_override = dataSheet.getRange("C22").getValue();
  resultJson.id.sedol_1.comment = dataSheet.getRange("D22").getValue();
  resultJson.id.sedol_2.rule_based = dataSheet.getRange("B23").getValue();
  resultJson.id.sedol_2.manual_override = dataSheet.getRange("C23").getValue();
  resultJson.id.sedol_2.comment = dataSheet.getRange("D23").getValue();
  resultJson.id.sedol_3.rule_based = dataSheet.getRange("B24").getValue();
  resultJson.id.sedol_3.manual_override = dataSheet.getRange("C24").getValue();
  resultJson.id.sedol_3.comment = dataSheet.getRange("D24").getValue();
  resultJson.id.sedol_4.rule_based = dataSheet.getRange("B25").getValue();
  resultJson.id.sedol_4.manual_override = dataSheet.getRange("C25").getValue();
  resultJson.id.sedol_4.comment = dataSheet.getRange("D25").getValue();
  resultJson.id.sedol_5.rule_based = dataSheet.getRange("B26").getValue();
  resultJson.id.sedol_5.manual_override = dataSheet.getRange("C26").getValue();
  resultJson.id.sedol_5.comment = dataSheet.getRange("D26").getValue();
  resultJson.id.wkn.rule_based = dataSheet.getRange("B27").getValue();
  resultJson.id.wkn.manual_override = dataSheet.getRange("C27").getValue();
  resultJson.id.wkn.comment = dataSheet.getRange("D27").getValue();
  resultJson.id.limpid_credits_id.rule_based = dataSheet.getRange("B28").getValue();
  resultJson.id.limpid_credits_id.manual_override = dataSheet.getRange("C28").getValue();
  resultJson.id.limpid_credits_id.comment = dataSheet.getRange("D28").getValue();
  resultJson.id.bbg_ticker_1.rule_based = dataSheet.getRange("B29").getValue();
  resultJson.id.bbg_ticker_1.manual_override = dataSheet.getRange("C29").getValue();
  resultJson.id.bbg_ticker_1.comment = dataSheet.getRange("D29").getValue();
  resultJson.id.bbg_ticker_2.rule_based = dataSheet.getRange("B30").getValue();
  resultJson.id.bbg_ticker_2.manual_override = dataSheet.getRange("C30").getValue();
  resultJson.id.bbg_ticker_2.comment = dataSheet.getRange("D30").getValue();
  resultJson.id.bbg_ticker_3.rule_based = dataSheet.getRange("B31").getValue();
  resultJson.id.bbg_ticker_3.manual_override = dataSheet.getRange("C31").getValue();
  resultJson.id.bbg_ticker_3.comment = dataSheet.getRange("D31").getValue();
  resultJson.id.reuters_ticker_1.rule_based = dataSheet.getRange("B32").getValue();
  resultJson.id.reuters_ticker_1.manual_override = dataSheet.getRange("C32").getValue();
  resultJson.id.reuters_ticker_1.comment = dataSheet.getRange("D32").getValue();
  resultJson.id.reuters_ticker_2.rule_based = dataSheet.getRange("B33").getValue();
  resultJson.id.reuters_ticker_2.manual_override = dataSheet.getRange("C33").getValue();
  resultJson.id.reuters_ticker_2.comment = dataSheet.getRange("D33").getValue();
  resultJson.id.reuters_ticker_3.rule_based = dataSheet.getRange("B34").getValue();
  resultJson.id.reuters_ticker_3.manual_override = dataSheet.getRange("C34").getValue();
  resultJson.id.reuters_ticker_3.comment = dataSheet.getRange("D34").getValue();
  
  resultJson.security.type.rule_based = dataSheet.getRange("B36").getValue();
  resultJson.security.type.manual_override = dataSheet.getRange("C36").getValue();
  resultJson.security.type.comment = dataSheet.getRange("D36").getValue();
  resultJson.security.subtype.rule_based = dataSheet.getRange("B37").getValue();
  resultJson.security.subtype.manual_override = dataSheet.getRange("C37").getValue();
  resultJson.security.subtype.comment = dataSheet.getRange("D37").getValue();
  resultJson.security.status.rule_based = dataSheet.getRange("B38").getValue();
  resultJson.security.status.manual_override = dataSheet.getRange("C38").getValue();
  resultJson.security.status.comment = dataSheet.getRange("D38").getValue();
  resultJson.security.issue_date.rule_based = getDateStr(dataSheet.getRange("B39").getValue());
  resultJson.security.issue_date.manual_override = getDateStr(dataSheet.getRange("C39").getValue());
  resultJson.security.issue_date.comment = dataSheet.getRange("D39").getValue();
  resultJson.security.issue.price.rule_based = getNumberStr(dataSheet.getRange("B40").getValue());
  resultJson.security.issue.price.manual_override = getNumberStr(dataSheet.getRange("C40").getValue());
  resultJson.security.issue.price.comment = dataSheet.getRange("D40").getValue();
  resultJson.security.issue.currency.rule_based = dataSheet.getRange("B41").getValue();
  resultJson.security.issue.currency.manual_override = dataSheet.getRange("C41").getValue();
  resultJson.security.issue.comment = dataSheet.getRange("D41").getValue();
  resultJson.security.number_of_possible_shares.rule_based = getNumberStr(dataSheet.getRange("B42").getValue());
  resultJson.security.number_of_possible_shares.manual_override = getNumberStr(dataSheet.getRange("C42").getValue());
  resultJson.security.number_of_possible_shares.comment = dataSheet.getRange("D42").getValue();
  resultJson.security.number_of_issued_shares.rule_based = getNumberStr(dataSheet.getRange("B43").getValue());
  resultJson.security.number_of_issued_shares.manual_override = getNumberStr(dataSheet.getRange("C43").getValue());
  resultJson.security.number_of_issued_shares.comment = dataSheet.getRange("D43").getValue();
  resultJson.security.number_of_outstanding_shares.rule_based = getNumberStr(dataSheet.getRange("B44").getValue());
  resultJson.security.number_of_outstanding_shares.manual_override = getNumberStr(dataSheet.getRange("C44").getValue());
  resultJson.security.number_of_outstanding_shares.comment = dataSheet.getRange("D44").getValue();
  resultJson.security.par_value.amount.rule_based = getNumberStr(dataSheet.getRange("B45").getValue());
  resultJson.security.par_value.amount.manual_override = getNumberStr(dataSheet.getRange("C45").getValue());
  resultJson.security.par_value.amount.comment = dataSheet.getRange("D45").getValue();
  resultJson.security.par_value.currency.rule_based = dataSheet.getRange("B46").getValue();
  resultJson.security.par_value.currency.manual_override = dataSheet.getRange("C46").getValue();
  resultJson.security.par_value.currency.comment = dataSheet.getRange("D46").getValue();

  resultJson.issuer.name.rule_based = dataSheet.getRange("B48").getValue();
  resultJson.issuer.name.manual_override = dataSheet.getRange("C48").getValue();
  resultJson.issuer.name.comment = dataSheet.getRange("D48").getValue();
  resultJson.issuer.ultimate_parent.scdm_code.rule_based = dataSheet.getRange("B49").getValue();
  resultJson.issuer.ultimate_parent.scdm_code.manual_override = dataSheet.getRange("C49").getValue();
  resultJson.issuer.ultimate_parent.scdm_code.comment = dataSheet.getRange("D49").getValue();
  resultJson.issuer.ultimate_parent.name.rule_based = dataSheet.getRange("B50").getValue();
  resultJson.issuer.ultimate_parent.name.manual_override = dataSheet.getRange("C50").getValue();
  resultJson.issuer.ultimate_parent.name.comment = dataSheet.getRange("D50").getValue();
  resultJson.issuer.direct_parent.scdm_code.rule_based = dataSheet.getRange("B51").getValue();
  resultJson.issuer.direct_parent.scdm_code.manual_override = dataSheet.getRange("C51").getValue();
  resultJson.issuer.direct_parent.scdm_code.comment = dataSheet.getRange("D51").getValue();
  resultJson.issuer.direct_parent.name.rule_based = dataSheet.getRange("B52").getValue();
  resultJson.issuer.direct_parent.name.manual_override = dataSheet.getRange("C52").getValue();
  resultJson.issuer.direct_parent.name.comment = dataSheet.getRange("D52").getValue();
  
  resultJson.country.domicile_code.rule_based = dataSheet.getRange("B54").getValue();
  resultJson.country.domicile_code.manual_override = dataSheet.getRange("C54").getValue();
  resultJson.country.domicile_code.comment = dataSheet.getRange("D54").getValue();
  resultJson.country.risk_code.rule_based = dataSheet.getRange("B55").getValue();
  resultJson.country.risk_code.manual_override = dataSheet.getRange("C55").getValue();
  resultJson.country.risk_code.comment = dataSheet.getRange("D55").getValue();
  
  resultJson.issuer_rating.moodys.rating.rule_based = dataSheet.getRange("B57").getValue();
  resultJson.issuer_rating.moodys.rating.manual_override = dataSheet.getRange("C57").getValue();
  resultJson.issuer_rating.moodys.rating.comment = dataSheet.getRange("D57").getValue();
  resultJson.issuer_rating.moodys.rating_date.rule_based = getDateStr(dataSheet.getRange("B58").getValue());
  resultJson.issuer_rating.moodys.rating_date.manual_override = getDateStr(dataSheet.getRange("C58").getValue());
  resultJson.issuer_rating.moodys.rating_date.comment = dataSheet.getRange("D58").getValue();
  resultJson.issuer_rating.snp.rating.rule_based = dataSheet.getRange("B59").getValue();
  resultJson.issuer_rating.snp.rating.manual_override = dataSheet.getRange("C59").getValue();
  resultJson.issuer_rating.snp.rating.comment = dataSheet.getRange("D59").getValue();
  resultJson.issuer_rating.snp.rating_date.rule_based = getDateStr(dataSheet.getRange("B60").getValue());
  resultJson.issuer_rating.snp.rating_date.manual_override = getDateStr(dataSheet.getRange("C60").getValue());
  resultJson.issuer_rating.snp.rating_date.comment = dataSheet.getRange("D60").getValue();
  resultJson.issuer_rating.fitch.rating.rule_based = dataSheet.getRange("B61").getValue();
  resultJson.issuer_rating.fitch.rating.manual_override = dataSheet.getRange("C61").getValue();
  resultJson.issuer_rating.fitch.rating.comment = dataSheet.getRange("D61").getValue();
  resultJson.issuer_rating.fitch.rating_date.rule_based = getDateStr(dataSheet.getRange("B62").getValue());
  resultJson.issuer_rating.fitch.rating_date.manual_override = getDateStr(dataSheet.getRange("C62").getValue());
  resultJson.issuer_rating.fitch.rating_date.comment = dataSheet.getRange("D62").getValue();
  
  resultJson.issuer_rating.scdm.rating.rule_based = dataSheet.getRange("B63").getValue();
  resultJson.issuer_rating.scdm.rating.manual_override = dataSheet.getRange("C63").getValue();
  resultJson.issuer_rating.scdm.rating_date.rule_based = getDateStr(dataSheet.getRange("B64").getValue());
  resultJson.issuer_rating.scdm.rating_date.manual_override = getDateStr(dataSheet.getRange("C64").getValue());
  
  resultJson.comments.general = dataSheet.getRange("B66").getValue();
  
  var filledJsonStr = JSON.stringify(resultJson);
  this.s3.saveFileToS3(finalIsin + "_Equity.json", filledJsonStr);
  
  SpreadsheetApp.getUi().alert("Storing back finished successfully.");
}

function setScope() {
  //SpreadsheetApp.getUi().alert("Currently only scope \"current\" is supported.");
  var html = HtmlService.createHtmlOutputFromFile('Scope').setWidth(300).setHeight(100);
  SpreadsheetApp.getUi().showModalDialog(html, ' ');
}

function showScope(){
  var userProperties = PropertiesService.getUserProperties();
  var PATHKEY = "PATH";
  SpreadsheetApp.getUi().alert("Current scope: " + userProperties.getProperty(PATHKEY));
}

function loadFileFromS3(name) {
  /*var properties = PropertiesService.getScriptProperties();
  s3 = properties.getProperty("S3");*/
  
  var VERSIONSHEETNAME = "version";
  var DATASHEETNAME = "data";
  var ROLEKEY = "ROLE";
  var ROLEANALYST = "ANALYST";
  var ROLECONTROLLER = "CONTROLLER";
  
  var isAnalyst;
  var role = PropertiesService.getUserProperties().getProperty(ROLEKEY);
  if (role === ROLEANALYST) {
    isAnalyst = true;
  } else if (role === ROLECONTROLLER){
    isAnalyst = false;
  } else {
    throw "User role not set. Please try again.";
  }
  
  this.s3.loadFileFromS3IntoTmpFolder(name);
  var s3FileBlob = getTempFileBlob();
  var s3Data = JSON.parse(s3FileBlob.getDataAsString());
  var versionSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(VERSIONSHEETNAME);
  var dataSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(DATASHEETNAME);
  
  if (s3Data.version.code === "v1" || s3Data.version.code === "v2") {
    versionSheet.getRange("A1").setValue(s3Data.version.code);
  } else {
    throw "Only version v1 and v2 are suppored.";
  }
  if (s3Data.version.type === "Equity") {
    versionSheet.getRange("A2").setValue(s3Data.version.type);
  } else {
    throw "Only type Equity is suppored.";
  }
  
  isV1 = false;
  if (s3Data.version.code === "v1") {
    isV1 = true;
  }
  
  dataSheet.getRange("B2").setValue(s3Data.analyst.timestamp_last_change);
  
  if (isAnalyst) {
    dataSheet.getRange("B3").setValue(Session.getActiveUser().getEmail());
    dataSheet.getRange("B4").setValue(s3Data.analyst.controller);
  } else {
    dataSheet.getRange("B3").setValue(s3Data.analyst.analyst);
    dataSheet.getRange("B4").setValue(Session.getActiveUser().getEmail());
  }
  
  dataSheet.getRange("B6").setValue(s3Data.internal_data.as_of_date);
  dataSheet.getRange("B7").setValue(s3Data.internal_data.internal_id);
  dataSheet.getRange("B8").setValue(s3Data.internal_data.bbg_id);
  dataSheet.getRange("B9").setValue(s3Data.internal_data.reuters_id);
  dataSheet.getRange("B10").setValue(s3Data.internal_data.wm_id);
  
  dataSheet.getRange("B12").setValue(s3Data.id.isin.rule_based);
  dataSheet.getRange("C12").setValue(s3Data.id.isin.manual_override);
  if (!isV1) {dataSheet.getRange("D12").setValue(s3Data.id.isin.comment);}
  dataSheet.getRange("B13").setValue(s3Data.id.isin_2.rule_based);
  dataSheet.getRange("C13").setValue(s3Data.id.isin_2.manual_override);
  if (!isV1) {dataSheet.getRange("D13").setValue(s3Data.id.isin_2.comment);}
  dataSheet.getRange("B14").setValue(s3Data.id.isin_3.rule_based);
  dataSheet.getRange("C14").setValue(s3Data.id.isin_3.manual_override);
  if (!isV1) {dataSheet.getRange("D14").setValue(s3Data.id.isin_3.comment);}
  dataSheet.getRange("B15").setValue(s3Data.id.isin_4.rule_based);
  dataSheet.getRange("C15").setValue(s3Data.id.isin_4.manual_override);
  if (!isV1) {dataSheet.getRange("D15").setValue(s3Data.id.isin_4.comment);}
  dataSheet.getRange("B16").setValue(s3Data.id.isin_5.rule_based);
  dataSheet.getRange("C16").setValue(s3Data.id.isin_5.manual_override);
  if (!isV1) {dataSheet.getRange("D16").setValue(s3Data.id.isin_5.comment);}
  dataSheet.getRange("B17").setValue(s3Data.id.cusip_1.rule_based);
  dataSheet.getRange("C17").setValue(s3Data.id.cusip_1.manual_override);
  if (!isV1) {dataSheet.getRange("D17").setValue(s3Data.id.cusip_1.comment);}
  dataSheet.getRange("B18").setValue(s3Data.id.cusip_2.rule_based);
  dataSheet.getRange("C18").setValue(s3Data.id.cusip_2.manual_override);
  if (!isV1) {dataSheet.getRange("D18").setValue(s3Data.id.cusip_2.comment);}
  dataSheet.getRange("B19").setValue(s3Data.id.cusip_3.rule_based);
  dataSheet.getRange("C19").setValue(s3Data.id.cusip_3.manual_override);
  if (!isV1) {dataSheet.getRange("D19").setValue(s3Data.id.cusip_3.comment);}
  dataSheet.getRange("B20").setValue(s3Data.id.cusip_4.rule_based);
  dataSheet.getRange("C20").setValue(s3Data.id.cusip_4.manual_override);
  if (!isV1) {dataSheet.getRange("D20").setValue(s3Data.id.cusip_4.comment);}
  dataSheet.getRange("B21").setValue(s3Data.id.cusip_5.rule_based);
  dataSheet.getRange("C21").setValue(s3Data.id.cusip_5.manual_override);
  if (!isV1) {dataSheet.getRange("D21").setValue(s3Data.id.cusip_5.comment);}
  dataSheet.getRange("B22").setValue(s3Data.id.sedol_1.rule_based);
  dataSheet.getRange("C22").setValue(s3Data.id.sedol_1.manual_override);
  if (!isV1) {dataSheet.getRange("D22").setValue(s3Data.id.sedol_1.comment);}
  dataSheet.getRange("B23").setValue(s3Data.id.sedol_2.rule_based);
  dataSheet.getRange("C23").setValue(s3Data.id.sedol_2.manual_override);
  if (!isV1) {dataSheet.getRange("D23").setValue(s3Data.id.sedol_2.comment);}
  dataSheet.getRange("B24").setValue(s3Data.id.sedol_3.rule_based);
  dataSheet.getRange("C24").setValue(s3Data.id.sedol_3.manual_override);
  if (!isV1) {dataSheet.getRange("D24").setValue(s3Data.id.sedol_3.comment);}
  dataSheet.getRange("B25").setValue(s3Data.id.sedol_4.rule_based);
  dataSheet.getRange("C25").setValue(s3Data.id.sedol_4.manual_override);
  if (!isV1) {dataSheet.getRange("D25").setValue(s3Data.id.sedol_4.comment);}
  dataSheet.getRange("B26").setValue(s3Data.id.sedol_5.rule_based);
  dataSheet.getRange("C26").setValue(s3Data.id.sedol_5.manual_override);
  if (!isV1) {dataSheet.getRange("D26").setValue(s3Data.id.sedol_5.comment);}
  dataSheet.getRange("B27").setValue(s3Data.id.wkn.rule_based);
  dataSheet.getRange("C27").setValue(s3Data.id.wkn.manual_override);
  if (!isV1) {dataSheet.getRange("D27").setValue(s3Data.id.wkn.comment);}
  dataSheet.getRange("B28").setValue(s3Data.id.limpid_credits_id.rule_based);
  dataSheet.getRange("C28").setValue(s3Data.id.limpid_credits_id.manual_override);
  if (!isV1) {dataSheet.getRange("D28").setValue(s3Data.id.limpid_credits_id.comment);}
  dataSheet.getRange("B29").setValue(s3Data.id.bbg_ticker_1.rule_based);
  dataSheet.getRange("C29").setValue(s3Data.id.bbg_ticker_1.manual_override);
  if (!isV1) {dataSheet.getRange("D29").setValue(s3Data.id.bbg_ticker_1.comment);}
  dataSheet.getRange("B30").setValue(s3Data.id.bbg_ticker_2.rule_based);
  dataSheet.getRange("C30").setValue(s3Data.id.bbg_ticker_2.manual_override)
  if (!isV1) {dataSheet.getRange("D30").setValue(s3Data.id.bbg_ticker_2.comment);}
  dataSheet.getRange("B31").setValue(s3Data.id.bbg_ticker_3.rule_based);
  dataSheet.getRange("C31").setValue(s3Data.id.bbg_ticker_3.manual_override);
  if (!isV1) {dataSheet.getRange("D31").setValue(s3Data.id.bbg_ticker_3.comment);}  
  dataSheet.getRange("B32").setValue(s3Data.id.reuters_ticker_1.rule_based);
  dataSheet.getRange("C32").setValue(s3Data.id.reuters_ticker_1.manual_override);
  if (!isV1) {dataSheet.getRange("D32").setValue(s3Data.id.reuters_ticker_1.comment);}  
  dataSheet.getRange("B33").setValue(s3Data.id.reuters_ticker_2.rule_based);
  dataSheet.getRange("C33").setValue(s3Data.id.reuters_ticker_2.manual_override);
  if (!isV1) {dataSheet.getRange("D33").setValue(s3Data.id.reuters_ticker_2.comment);}  
  dataSheet.getRange("B34").setValue(s3Data.id.reuters_ticker_3.rule_based);
  dataSheet.getRange("C34").setValue(s3Data.id.reuters_ticker_3.manual_override);
  if (!isV1) {dataSheet.getRange("D34").setValue(s3Data.id.reuters_ticker_3.comment);}
  
  dataSheet.getRange("B36").setValue("Equity"); //s3Data.security.type.rule_based); // only Equity type is supported
  dataSheet.getRange("C36").setValue(s3Data.security.type.manual_override);
  if (!isV1) {dataSheet.getRange("D36").setValue(s3Data.security.type.comment);}
  dataSheet.getRange("B37").setValue(s3Data.security.subtype.rule_based);
  dataSheet.getRange("C37").setValue(s3Data.security.subtype.manual_override);
  if (!isV1) {dataSheet.getRange("D37").setValue(s3Data.security.subtype.comment);}
  dataSheet.getRange("B38").setValue("Active"); //s3Data.security.status.rule_based);
  dataSheet.getRange("C38").setValue(s3Data.security.status.manual_override);
  if (!isV1) {dataSheet.getRange("D38").setValue(s3Data.security.status.comment);}
  dataSheet.getRange("B39").setValue(s3Data.security.issue_date.rule_based);
  dataSheet.getRange("C39").setValue(s3Data.security.issue_date.manual_override);
  if (!isV1) {dataSheet.getRange("D39").setValue(s3Data.security.issue_date.comment);}
  dataSheet.getRange("B40").setValue(s3Data.security.issue.price.rule_based);
  dataSheet.getRange("C40").setValue(s3Data.security.issue.price.manual_override);
  if (!isV1) {dataSheet.getRange("D40").setValue(s3Data.security.issue.price.comment);}  
  dataSheet.getRange("B41").setValue(s3Data.security.issue.currency.rule_based);
  dataSheet.getRange("C41").setValue(s3Data.security.issue.currency.manual_override);
  if (!isV1) {dataSheet.getRange("D41").setValue(s3Data.security.issue.currency.comment);}
  dataSheet.getRange("B42").setValue(s3Data.security.number_of_possible_shares.rule_based);
  dataSheet.getRange("C42").setValue(s3Data.security.number_of_possible_shares.manual_override);
  if (!isV1) {dataSheet.getRange("D42").setValue(s3Data.security.number_of_possible_shares.comment);}
  dataSheet.getRange("B43").setValue(s3Data.security.number_of_issued_shares.rule_based);
  dataSheet.getRange("C43").setValue(s3Data.security.number_of_issued_shares.manual_override);
  if (!isV1) {dataSheet.getRange("D43").setValue(s3Data.security.number_of_issued_shares.comment);}
  dataSheet.getRange("B44").setValue(s3Data.security.number_of_outstanding_shares.rule_based);
  dataSheet.getRange("C44").setValue(s3Data.security.number_of_outstanding_shares.manual_override);
  if (!isV1) {dataSheet.getRange("D44").setValue(s3Data.security.number_of_outstanding_shares.comment);}
  dataSheet.getRange("B45").setValue(s3Data.security.par_value.amount.rule_based);
  dataSheet.getRange("C45").setValue(s3Data.security.par_value.amount.manual_override);
  if (!isV1) {dataSheet.getRange("D45").setValue(s3Data.security.par_value.amount.comment);}
  dataSheet.getRange("B46").setValue(s3Data.security.par_value.currency.rule_based);
  dataSheet.getRange("C46").setValue(s3Data.security.par_value.currency.manual_override);
  if (!isV1) {dataSheet.getRange("D46").setValue(s3Data.security.par_value.amount.comment);}
  
  dataSheet.getRange("B48").setValue(s3Data.issuer.name.rule_based);
  dataSheet.getRange("C48").setValue(s3Data.issuer.name.manual_override);
  if (!isV1) {dataSheet.getRange("D48").setValue(s3Data.issuer.name.comment);}
  dataSheet.getRange("B49").setValue(s3Data.issuer.ultimate_parent.scdm_code.rule_based);
  dataSheet.getRange("C49").setValue(s3Data.issuer.ultimate_parent.scdm_code.manual_override);
  if (!isV1) {dataSheet.getRange("D49").setValue(s3Data.issuer.ultimate_parent.scdm_code.comment);}
  dataSheet.getRange("B50").setValue(s3Data.issuer.ultimate_parent.name.rule_based);
  dataSheet.getRange("C50").setValue(s3Data.issuer.ultimate_parent.name.manual_override);
  if (!isV1) {dataSheet.getRange("D50").setValue(s3Data.issuer.ultimate_parent.name.comment);}
  dataSheet.getRange("B51").setValue(s3Data.issuer.direct_parent.scdm_code.rule_based);
  dataSheet.getRange("C51").setValue(s3Data.issuer.direct_parent.scdm_code.manual_override);
  if (!isV1) {dataSheet.getRange("D51").setValue(s3Data.issuer.direct_parent.scdm_code.comment);}
  dataSheet.getRange("B52").setValue(s3Data.issuer.direct_parent.name.rule_based);
  dataSheet.getRange("C52").setValue(s3Data.issuer.direct_parent.name.manual_override);
  if (!isV1) {dataSheet.getRange("D52").setValue(s3Data.issuer.direct_parent.name.comment);}
  
  dataSheet.getRange("B54").setValue(s3Data.country.domicile_code.rule_based);
  dataSheet.getRange("C54").setValue(s3Data.country.domicile_code.manual_override);
  if (!isV1) {dataSheet.getRange("D54").setValue(s3Data.country.domicile_code.comment);}
  dataSheet.getRange("B55").setValue(s3Data.country.risk_code.rule_based);
  dataSheet.getRange("C55").setValue(s3Data.country.risk_code.manual_override);
  if (!isV1) {dataSheet.getRange("D55").setValue(s3Data.country.risk_code.comment);}
  
  dataSheet.getRange("B57").setValue(s3Data.issuer_rating.moodys.rating.rule_based);
  dataSheet.getRange("C57").setValue(s3Data.issuer_rating.moodys.rating.manual_override);
  if (!isV1) {dataSheet.getRange("D57").setValue(s3Data.issuer_rating.moodys.rating.comment);}
  dataSheet.getRange("B58").setValue(s3Data.issuer_rating.moodys.rating_date.rule_based);
  dataSheet.getRange("C58").setValue(s3Data.issuer_rating.moodys.rating_date.manual_override);
  if (!isV1) {dataSheet.getRange("D58").setValue(s3Data.issuer_rating.moodys.rating_date.comment);}
  dataSheet.getRange("B59").setValue(s3Data.issuer_rating.snp.rating.rule_based);
  dataSheet.getRange("C59").setValue(s3Data.issuer_rating.snp.rating.manual_override);
  if (!isV1) {dataSheet.getRange("D59").setValue(s3Data.issuer_rating.snp.rating.comment);}
  dataSheet.getRange("B60").setValue(s3Data.issuer_rating.snp.rating_date.rule_based);
  dataSheet.getRange("C60").setValue(s3Data.issuer_rating.snp.rating_date.manual_override);
  if (!isV1) {dataSheet.getRange("D60").setValue(s3Data.issuer_rating.snp.rating_date.comment);}
  dataSheet.getRange("B61").setValue(s3Data.issuer_rating.fitch.rating.rule_based);
  dataSheet.getRange("C61").setValue(s3Data.issuer_rating.fitch.rating.manual_override);
  if (!isV1) {dataSheet.getRange("D61").setValue(s3Data.issuer_rating.fitch.rating.comment);}  
  dataSheet.getRange("B62").setValue(s3Data.issuer_rating.fitch.rating_date.rule_based);
  dataSheet.getRange("C62").setValue(s3Data.issuer_rating.fitch.rating_date.manual_override);
  if (!isV1) {dataSheet.getRange("D62").setValue(s3Data.issuer_rating.fitch.rating_date.comment);}
  
  dataSheet.getRange("B63").setValue(s3Data.issuer_rating.scdm.rating.rule_based);
  dataSheet.getRange("C63").setValue(s3Data.issuer_rating.scdm.rating.manual_override);
  dataSheet.getRange("B64").setValue(s3Data.issuer_rating.scdm.rating_date.rule_based);
  dataSheet.getRange("C64").setValue(s3Data.issuer_rating.scdm.rating_date.manual_override);
  
  if (!isV1) {
    dataSheet.getRange("B66").setValue(s3Data.comments.general);
  }
}

function getTempFileBlob() {
  var DIFOLDERNAME = "EQUITY-DI";
  var TEMPFOLDERNAME = "DI_TEMP_FOLDER_" + Session.getActiveUser().getEmail();
  
  var tmpFolder = getTempFolder();
  
  firstIteration = true;
  var tmpFiles = tmpFolder.getFiles();
  var tmpFile = null;
  while (tmpFiles.hasNext()) {
    if (firstIteration == true) {
      tmpFile = tmpFiles.next();
      firstIteration = false;
    } else {
      throw ("You have several files in temp folder.\nOnly one is allowed!");
    }
  }
  if (tmpFile == null) {
    throw ("You have no file in folder named " + TEMPFOLDERNAME + ". Exactly one file is needed");
  }
  
  return tmpFile.getBlob();
}

function getDateStr(date) {
  try {
    var year = date.getFullYear();
    var month = convertToMonthName(date.getMonth());
    var day = convertDayToStr(date.getDate());
    return year + '-' + month + '-' + day
    //return Utilities.formatDate(date, "GMT", "yyyy-MMM-dd");
  } catch(e) {
    date = date + "";
    if (date.length == 0) {
      return "";
    } else {
      throw date + " could not be interpreted as date";
    }
  }
}

function convertToMonthName(monthNumber) {
 var month = new Array();
  month[0] = "Jan";
  month[1] = "Feb";
  month[2] = "Mar";
  month[3] = "Apr";
  month[4] = "May";
  month[5] = "Jun";
  month[6] = "Jul";
  month[7] = "Aug";
  month[8] = "Sep";
  month[9] = "Oct";
  month[10] = "Nov";
  month[11] = "Dec";
  return month[monthNumber];
}

function convertDayToStr(day) {
  var strDay = day + '';
  if (strDay.length === 1) {
    strDay = "0" + strDay;
  }
  return strDay;
}

function getNumberStr(number) {
  var type = typeof number;
  if (type === "number") {
    return number.toString();
  } else if (type === "string") {
    if (number.length > 0) {
      throw number + " could not be interpreted as number";
    } else {
      return "";
    }
  } else {
    throw number + " could not be interpreted as number ";
  }
}

function setScopeDate(scopeDate) {
  var PATHKEY = "PATH";
  var PATH = "/financial-instruments/" + scopeDate + "/";
  
  var userProperties = PropertiesService.getUserProperties();
  userProperties.deleteProperty(PATHKEY);
  userProperties.setProperty(PATHKEY, PATH);
  SpreadsheetApp.getUi().alert("Scope set to: " + userProperties.getProperty(PATHKEY));

}

function getTempFolder() {
  var rootFolder = DriveApp.getRootFolder();
  var tmpFolders = rootFolder.getFoldersByName("DI_TEMP_FOLDER_" + Session.getActiveUser().getEmail());
  var firstIteration = true;
  var tmpFolder = null;
  while (tmpFolders.hasNext()) {
    if (firstIteration == true) {
      tmpFolder = tmpFolders.next();
      firstIteration = false;
    } else {
      throw ("You have several temp folders.\nOnly one is allowed!");
    }
  }
  if (tmpFolder == null) {
    throw ("You have no temp folder named " + "DI_TEMP_FOLDER_" + Session.getActiveUser().getEmail() + ".\nThat folder is needed");
  }
  Logger.log(tmpFolder);
  return tmpFolder;
}

function getCurrentDateTimeString() {
  return Utilities.formatDate(new Date(), "UTC", "yyyyMMdd'T'HHmmss'Z'");
}
