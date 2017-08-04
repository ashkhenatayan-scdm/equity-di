function getEmptyJsonTemplate(name) {
  var isin = name.substring(0, name.indexOf("_Equity.json"));
  var template = "";
  template = template + "{\n";
  template = template + "  \"version\":{\n";
  template = template + "    \"code\":\"v2\",\n";
  template = template + "    \"type\":\"Equity\"\n";
  template = template + "  },\n";
  template = template + "  \"analyst\":{\n";
  template = template + "    \"timestamp_last_change\":\"\",\n";
  template = template + "    \"analyst\":\"\",\n";
  template = template + "    \"controller\":\"\"\n";
  template = template + "  },\n";
  template = template + "  \"internal_data\":{\n";
  template = template + "    \"as_of_date\":\"\",\n";
  template = template + "    \"internal_id\":\"\",\n";
  template = template + "    \"bbg_id\":\"\",\n";
  template = template + "    \"reuters_id\":\"\",\n";
  template = template + "    \"wm_id\":\"\"\n";
  template = template + "  },\n";
  template = template + "  \"id\":{\n";
  template = template + "    \"isin\":{\n";
  template = template + "      \"rule_based\":\"\",\n";
  template = template + "      \"manual_override\":\"" + isin + "\",\n";
  template = template + "      \"comment\":\"\"\n";
  template = template + "    },\n";
  template = template + "    \"isin_2\":{\n";
  template = template + "      \"rule_based\":\"\",\n";
  template = template + "      \"manual_override\":\"\",\n";
  template = template + "      \"comment\":\"\"\n";
  template = template + "    },\n";
  template = template + "    \"isin_3\":{\n";
  template = template + "      \"rule_based\":\"\",\n";
  template = template + "      \"manual_override\":\"\",\n";
  template = template + "      \"comment\":\"\"\n";
  template = template + "    },\n";
  template = template + "    \"isin_4\":{\n";
  template = template + "      \"rule_based\":\"\",\n";
  template = template + "      \"manual_override\":\"\",\n";
  template = template + "      \"comment\":\"\"\n";
  template = template + "    },\n";
  template = template + "    \"isin_5\":{\n";
  template = template + "      \"rule_based\":\"\",\n";
  template = template + "      \"manual_override\":\"\",\n";
  template = template + "      \"comment\":\"\"\n";
  template = template + "    },\n";
  template = template + "    \"cusip_1\":{\n";
  template = template + "      \"rule_based\":\"\",\n";
  template = template + "      \"manual_override\":\"\",\n";
  template = template + "      \"comment\":\"\"\n";
  template = template + "    },\n";
  template = template + "    \"cusip_2\":{\n";
  template = template + "      \"rule_based\":\"\",\n";
  template = template + "      \"manual_override\":\"\",\n";
  template = template + "      \"comment\":\"\"\n";
  template = template + "    },\n";
  template = template + "    \"cusip_3\":{\n";
  template = template + "      \"rule_based\":\"\",\n";
  template = template + "      \"manual_override\":\"\",\n";
  template = template + "      \"comment\":\"\"\n";
  template = template + "    },\n";
  template = template + "    \"cusip_4\":{\n";
  template = template + "      \"rule_based\":\"\",\n";
  template = template + "      \"manual_override\":\"\",\n";
  template = template + "      \"comment\":\"\"\n";
  template = template + "    },\n";
  template = template + "    \"cusip_5\":{\n";
  template = template + "      \"rule_based\":\"\",\n";
  template = template + "      \"manual_override\":\"\",\n";
  template = template + "      \"comment\":\"\"\n";
  template = template + "    },\n";
  template = template + "    \"sedol_1\":{\n";
  template = template + "      \"rule_based\":\"\",\n";
  template = template + "      \"manual_override\":\"\",\n";
  template = template + "      \"comment\":\"\"\n";
  template = template + "    },\n";
  template = template + "    \"sedol_2\":{\n";
  template = template + "      \"rule_based\":\"\",\n";
  template = template + "      \"manual_override\":\"\",\n";
  template = template + "      \"comment\":\"\"\n";
  template = template + "    },\n";
  template = template + "    \"sedol_3\":{\n";
  template = template + "      \"rule_based\":\"\",\n";
  template = template + "      \"manual_override\":\"\",\n";
  template = template + "      \"comment\":\"\"\n";
  template = template + "    },\n";
  template = template + "    \"sedol_4\":{\n";
  template = template + "      \"rule_based\":\"\",\n";
  template = template + "      \"manual_override\":\"\",\n";
  template = template + "      \"comment\":\"\"\n";
  template = template + "    },\n";
  template = template + "    \"sedol_5\":{\n";
  template = template + "      \"rule_based\":\"\",\n";
  template = template + "      \"manual_override\":\"\",\n";
  template = template + "      \"comment\":\"\"\n";
  template = template + "    },\n";
  template = template + "    \"wkn\":{\n";
  template = template + "      \"rule_based\":\"\",\n";
  template = template + "      \"manual_override\":\"\",\n";
  template = template + "      \"comment\":\"\"\n";
  template = template + "    },\n";
  template = template + "    \"limpid_credits_id\":{\n";
  template = template + "      \"rule_based\":\"\",\n";
  template = template + "      \"manual_override\":\"\",\n";
  template = template + "      \"comment\":\"\"\n";
  template = template + "    },\n";
  template = template + "    \"bbg_ticker_1\":{\n";
  template = template + "      \"rule_based\":\"\",\n";
  template = template + "      \"manual_override\":\"\",\n";
  template = template + "      \"comment\":\"\"\n";
  template = template + "    },\n";
  template = template + "    \"bbg_ticker_2\":{\n";
  template = template + "      \"rule_based\":\"\",\n";
  template = template + "      \"manual_override\":\"\",\n";
  template = template + "      \"comment\":\"\"\n";
  template = template + "    },\n";
  template = template + "    \"bbg_ticker_3\":{\n";
  template = template + "      \"rule_based\":\"\",\n";
  template = template + "      \"manual_override\":\"\",\n";
  template = template + "      \"comment\":\"\"\n";
  template = template + "    },\n";
  template = template + "    \"reuters_ticker_1\":{\n";
  template = template + "      \"rule_based\":\"\",\n";
  template = template + "      \"manual_override\":\"\",\n";
  template = template + "      \"comment\":\"\"\n";
  template = template + "    },\n";
  template = template + "    \"reuters_ticker_2\":{\n";
  template = template + "      \"rule_based\":\"\",\n";
  template = template + "      \"manual_override\":\"\",\n";
  template = template + "      \"comment\":\"\"\n";
  template = template + "    },\n";
  template = template + "    \"reuters_ticker_3\":{\n";
  template = template + "      \"rule_based\":\"\",\n";
  template = template + "      \"manual_override\":\"\",\n";
  template = template + "      \"comment\":\"\"\n";
  template = template + "    }\n";
  template = template + "  },\n";
  template = template + "  \"security\":{\n";
  template = template + "    \"type\":{\n";
  template = template + "      \"rule_based\":\"\",\n";
  template = template + "      \"manual_override\":\"\",\n";
  template = template + "      \"comment\":\"\"\n";
  template = template + "    },\n";
  template = template + "    \"subtype\":{\n";
  template = template + "      \"rule_based\":\"\",\n";
  template = template + "      \"manual_override\":\"\",\n";
  template = template + "      \"comment\":\"\"\n";
  template = template + "    },\n";
  template = template + "    \"status\":{\n";
  template = template + "      \"rule_based\":\"\",\n";
  template = template + "      \"manual_override\":\"\",\n";
  template = template + "      \"comment\":\"\"\n";
  template = template + "    },\n";
  template = template + "    \"issue_date\":{\n";
  template = template + "      \"rule_based\":\"\",\n";
  template = template + "      \"manual_override\":\"\",\n";
  template = template + "      \"comment\":\"\"\n";
  template = template + "    },\n";
  template = template + "    \"issue\":{\n";
  template = template + "      \"price\":{\n";
  template = template + "        \"rule_based\":\"\",\n";
  template = template + "        \"manual_override\":\"\",\n";
  template = template + "        \"comment\":\"\"\n";
  template = template + "      },\n";
  template = template + "      \"currency\":{\n";
  template = template + "        \"rule_based\":\"\",\n";
  template = template + "        \"manual_override\":\"\",\n";
  template = template + "        \"comment\":\"\"\n";
  template = template + "      }\n";
  template = template + "    },\n";
  template = template + "    \"number_of_possible_shares\":{\n";
  template = template + "      \"rule_based\":\"\",\n";
  template = template + "      \"manual_override\":\"\",\n";
  template = template + "      \"comment\":\"\"\n";
  template = template + "    },\n";
  template = template + "    \"number_of_issued_shares\":{\n";
  template = template + "      \"rule_based\":\"\",\n";
  template = template + "      \"manual_override\":\"\",\n";
  template = template + "      \"comment\":\"\"\n";
  template = template + "    },\n";
  template = template + "    \"number_of_outstanding_shares\":{\n";
  template = template + "      \"rule_based\":\"\",\n";
  template = template + "      \"manual_override\":\"\",\n";
  template = template + "      \"comment\":\"\"\n";
  template = template + "    },\n";
  template = template + "    \"par_value\":{\n";
  template = template + "      \"amount\":{\n";
  template = template + "        \"rule_based\":\"\",\n";
  template = template + "        \"manual_override\":\"\",\n";
  template = template + "        \"comment\":\"\"\n";
  template = template + "      },\n";
  template = template + "      \"currency\":{\n";
  template = template + "        \"rule_based\":\"\",\n";
  template = template + "        \"manual_override\":\"\",\n";
  template = template + "        \"comment\":\"\"\n";
  template = template + "      }\n";
  template = template + "    }\n";
  template = template + "  },\n";
  template = template + "  \"issuer\":{\n";
  template = template + "    \"name\":{\n";
  template = template + "      \"rule_based\":\"\",\n";
  template = template + "      \"manual_override\":\"\",\n";
  template = template + "      \"comment\":\"\"\n";
  template = template + "    },\n";
  template = template + "    \"ultimate_parent\":{\n";
  template = template + "      \"scdm_code\":{\n";
  template = template + "        \"rule_based\":\"\",\n";
  template = template + "        \"manual_override\":\"\",\n";
  template = template + "        \"comment\":\"\"\n";
  template = template + "      },\n";
  template = template + "      \"name\":{\n";
  template = template + "        \"rule_based\":\"\",\n";
  template = template + "        \"manual_override\":\"\",\n";
  template = template + "        \"comment\":\"\"\n";
  template = template + "      }\n";
  template = template + "    },\n";
  template = template + "    \"direct_parent\":{\n";
  template = template + "      \"scdm_code\":{\n";
  template = template + "        \"rule_based\":\"\",\n";
  template = template + "        \"manual_override\":\"\",\n";
  template = template + "        \"comment\":\"\"\n";
  template = template + "      },\n";
  template = template + "      \"name\":{\n";
  template = template + "        \"rule_based\":\"\",\n";
  template = template + "        \"manual_override\":\"\",\n";
  template = template + "        \"comment\":\"\"\n";
  template = template + "      }\n";
  template = template + "    }\n";
  template = template + "  },\n";
  template = template + "  \"country\":{\n";
  template = template + "    \"domicile_code\":{\n";
  template = template + "      \"rule_based\":\"\",\n";
  template = template + "      \"manual_override\":\"\",\n";
  template = template + "      \"comment\":\"\"\n";
  template = template + "    },\n";
  template = template + "    \"risk_code\":{\n";
  template = template + "      \"rule_based\":\"\",\n";
  template = template + "      \"manual_override\":\"\",\n";
  template = template + "      \"comment\":\"\"\n";
  template = template + "    }\n";
  template = template + "  },\n";
  template = template + "  \"issuer_rating\":{\n";
  template = template + "    \"moodys\":{\n";
  template = template + "      \"rating\":{\n";
  template = template + "        \"rule_based\":\"\",\n";
  template = template + "        \"manual_override\":\"\",\n";
  template = template + "        \"comment\":\"\"\n";
  template = template + "      },\n";
  template = template + "      \"rating_date\":{\n";
  template = template + "        \"rule_based\":\"\",\n";
  template = template + "        \"manual_override\":\"\",\n";
  template = template + "        \"comment\":\"\"\n";
  template = template + "      }\n";
  template = template + "    },\n";
  template = template + "    \"snp\":{\n";
  template = template + "      \"rating\":{\n";
  template = template + "        \"rule_based\":\"\",\n";
  template = template + "        \"manual_override\":\"\",\n";
  template = template + "        \"comment\":\"\"\n";
  template = template + "      },\n";
  template = template + "      \"rating_date\":{\n";
  template = template + "        \"rule_based\":\"\",\n";
  template = template + "        \"manual_override\":\"\",\n";
  template = template + "        \"comment\":\"\"\n";
  template = template + "      }\n";
  template = template + "    },\n";
  template = template + "    \"fitch\":{\n";
  template = template + "      \"rating\":{\n";
  template = template + "        \"rule_based\":\"\",\n";
  template = template + "        \"manual_override\":\"\",\n";
  template = template + "        \"comment\":\"\"\n";
  template = template + "      },\n";
  template = template + "      \"rating_date\":{\n";
  template = template + "        \"rule_based\":\"\",\n";
  template = template + "        \"manual_override\":\"\",\n";
  template = template + "        \"comment\":\"\"\n";
  template = template + "      }\n";
  template = template + "    },\n";
  template = template + "    \"scdm\":{\n";
  template = template + "      \"rating\":{\n";
  template = template + "        \"rule_based\":\"\",\n";
  template = template + "        \"manual_override\":\"\"\n";
  template = template + "      },\n";
  template = template + "      \"rating_date\":{\n";
  template = template + "        \"rule_based\":\"\",\n";
  template = template + "        \"manual_override\":\"\"\n";
  template = template + "      }\n";
  template = template + "    }\n";
  template = template + "  },\n";
  template = template + "  \"comments\":{\n";
  template = template + "    \"general\":\"\"\n";
  template = template + "  }\n";
  template = template + "}\n";
  return template;
}