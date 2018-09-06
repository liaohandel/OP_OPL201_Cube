console.log("read handel_rs485 v2.9 20171126 ... ");
/*
{
	var ackcmd = "f500025050"
	var okcmd = "f500025151"
	var failcmd = "f500025252"

}
*/

var rs485v029 = {
	"ackcmd" : "f500025050",
	"okcmd"  : "f500025151",
	"failcmd" : "f500025252",	
	"s70cmd" :  "f500027070",
	"s71cmd" :  "f5000471000071",
	"s71autocmd" : "f50009710300000000000091",
	"s72cmd" :  "f5000472000072",
	"s73cmd" :  "f5000473000073",
	"s74cmd" :  "f5000474000074",
	"s75cmd" :  "f5000475000075",
	"s76cmd" :  "f500057600000076",
	"s77cmd" :  "f500057700000077",
	"s78cmd" :  "f500057800000078",
	"s79cmd" :  "f500057900000079",
	"s7acmd" :  "f500057a0000007a",
	"s7bcmd" :  "f500057b0000007b",
	"s7ccmd" :  "f500047c00007c",
	"s7dcmd" :  "f500057d0000007d",
	"s7ecmd" :  "f500047e00007e",
	"s96cmd" :  "f5fe059600000096",
	"s97cmd" :  "f5fe059700000097",
	"s98cmd" :  "f5fe059800000098",
	"s99cmd" :  "f5fe059900000099",
	"s9acmd" :  "f5fe059a0000009a",
	"s9bcmd" :  "f5fe059b0000009b"		
}

var subcmdtype = {
	"STATU" : "s70cmd",
	"C71": "s71cmd",
	"C72": "s72cmd",
	"C73": "s73cmd",
	"C74": "s74cmd",
	"C75": "s75cmd",
	"C76": "s76cmd",
	"C77": "s77cmd",
	"C78": "s78cmd",
	"C79": "s79cmd",
	"C7A": "s7acmd",
	"C7B": "s7bcmd",
	"C7C": "s7ccmd",
	"C7D": "s7dcmd",
	"C7E": "s7ecmd"
}

var apicmdtype = {
	"STATU" : "GROUP",
	"C71": "LED",
	"C72": "PUMP",
	"C73": "AIRFAN",
	"C74": "GROUP",
	"C75": "UV",
	"C76": "CO2",
	"C77": "TEMPERATURE",
	"C78": "RH",
	"C79": "WATERLEVEL",
	"C7A": "ELECTRONS",
	"C7B": "PH",
	"C7C": "PWM",
	"C7D": "SETTIME",
	"C7E": "AUTO"
}

var r485subcmd = {
	    "OFF":0,
		"ON":1,
	    "LOAD":2,
	    "AUTO":3,
	    "SET":4,
	    "LOW":5,
	    "HI":6
}

var R485CMDDATA = {
		"LED":["C71","POS","GROUP","Action","UUID","STU"],
		"PUMP":["C72","POS","GROUP","Action","UUID"],
		"AIRFAN":["C73","POS","GROUP","Action","UUID","STU"],
		"GROUP":["C74","POS","GROUP","Action","UUID"],
		"UV":["C75","POS","GROUP","Action","UUID"],
		"CO2":["C76","POS","GROUP","Action","UUID"],
		"TEMPERATURE":["C77","POS","GROUP","Action","UUID"],
		"RH":["C78","POS","GROUP","Action","UUID"],
		"WATERLEVEL":["C79","POS","GROUP","Action","UUID"],
		"ELECTRONS":["C7A","POS","GROUP","Action","UUID"],
		"PH":["C7B","POS","GROUP","Action","UUID"],
		"PWM":["C7C","POS","GROUP","Action","UUID"],
		"SETTIME":["C7D","POS","GROUP","Action","UUID","STU"],
		"AUTO":["C7E","POS","GROUP","Action","UUID","STU"]
}

var devtypelib = {
	"A000":[ "LED","PUMP","AIRFAN", "GROUP"],
	"B000":[ "AIRFAN", "GROUP"],
	"B100":[ "PUMP","GROUP"],
	"B200":[ "PUMP","GROUP"],
	"B300":[ "PUMP","GROUP"],
	"B400":[ "LED","PUMP","AIRFAN","GROUP"],
	"B500":[ "PUMP","GROUP"],
	"B600":[ "PUMP","GROUP"],
	"B700":[ "TEMPERATURE","RH","GROUP"],
	"B800":[ "LED","GROUP"],
	"B900":[ "LED","GROUP"],
	"C000":[ "CO2","TEMPERATURE","RH","GROUP"],
	"C100":[ "CO2","GROUP"],
	"C200":[ "TEMPERATURE","RH","GROUP"],
	"C300":[ "ELECTRONS","GROUP"],
	"C400":[ "PH","GROUP"],
	"C500":[ "PUMP","GROUP"],
	"C600":[ "PUMP","GROUP"],
	"C700":[ "WATERLEVEL","GROUP"],
	"C800":[ "LED","GROUP"],
	"C900":[ "LED","GROUP"],
	"CA00":[ "WATERLEVEL","GROUP"],
	"CB00":[  "TEMPERATURE","WATERLEVEL","GROUP"],
	"D010":[ "LED","PUMP","PWM","AUTO","GROUP"],
	"D020":[ "LED","PUMP","PWM","AUTO","GROUP"],
	"D030":[ "LED","PUMP","PWM","AUTO","GROUP"],
	"D040":[ "LED","PUMP","PWM","AUTO","GROUP"],
	"D050":[ "LED","PUMP","PWM","AUTO","GROUP"],
	"D060":[ "LED","PUMP","PWM","AUTO","GROUP"],
	"D070":[ "LED","PUMP","PWM","AUTO","GROUP"],
	"D080":[ "LED","PUMP","PWM","AUTO","GROUP"],
	"D090":[ "LED","PUMP","PWM","AUTO","GROUP"],
	"D100":[ "LED","PUMP","PWM","AUTO","GROUP"]
}

var devtablib = {
	"A000": {
		"STATU": {"devadd":00,"LINK": 0,"GROUP": 0},
		"C71": {"sub": 1,"stu": 0,"Data": 0},
		"C72": {"sub": 1,"stu": 0,"Data": 0},
		"C73": {"sub": 1,"stu": 0,"Data": 0},
		"C74": {"sub": 1,"stu": 0,"Data": 0}
	},
	"B000": {
		"STATU": {"devadd":00,"LINK": 0,"GROUP": 0},
		"C73": {"sub": 1,"stu": 0,"Data": 0},
		"C74": {"sub": 1,"stu": 0,"Data": 0}
	},
	"B100": {
		"STATU": {"devadd":00,"LINK": 0,"GROUP": 0},
		"C72": {"sub": 1,"stu": 0,"Data": 0},
		"C74": {"sub": 1,"stu": 0,"Data": 0}
	},
	"B200": {
		"STATU": {"devadd":00,"LINK": 0,"GROUP": 0},
		"C72": {"sub": 1,"stu": 0,"Data": 0},
		"C74": {"sub": 1,"stu": 0,"Data": 0}
	},
	"B300": {
		"STATU": {"devadd":00,"LINK": 0,"GROUP": 0},
		"C72": {"sub": 1,"stu": 0,"Data": 0},
		"C74": {"sub": 1,"stu": 0,"Data": 0}
	},
	"B400": {
		"STATU": {"devadd":00,"LINK": 0,"GROUP": 0},
		"C71": {"sub": 1,"stu": 0,"Data": 0},
		"C72": {"sub": 1,"stu": 0,"Data": 0},
		"C73": {"sub": 1,"stu": 0,"Data": 0},
		"C74": {"sub": 1,"stu": 0,"Data": 0}
	},
	"B500": {
		"STATU": {"devadd":00,"LINK": 0,"GROUP": 0},
		"C72": {"sub": 1,"stu": 0,"Data": 0},
		"C74": {"sub": 1,"stu": 0,"Data": 0}
	},
	"B600": {
		"STATU": {"devadd":00,"LINK": 0,"GROUP": 0},
		"C72": {"sub": 1,"stu": 0,"Data": 0},
		"C74": {"sub": 1,"stu": 0,"Data": 0}
	},
	"B700": {
		"STATU": {"devadd":00,"LINK": 0,"GROUP": 0},
		"C77": {"sub": 1,"stu": 0,"Data": 0},
		"C78": {"sub": 1,"stu": 0,"Data": 0},
		"C74": {"sub": 1,"stu": 0,"Data": 0}
	},
	"B800": {
		"STATU": {"devadd":00,"LINK": 0,"GROUP": 0},
		"C71": {"sub": 1,"stu": 0,"Data": 0},
		"C74": {"sub": 1,"stu": 0,"Data": 0}
	},
	"B900": {
		"STATU": {"devadd":00,"LINK": 0,"GROUP": 0},
		"C71": {"sub": 1,"stu": 0,"Data": 0},
		"C74": {"sub": 1,"stu": 0,"Data": 0}
	},
	"C000": {
		"STATU": {"devadd":00,"LINK": 0,"GROUP": 0},
		"C76": {"sub": 1,"stu": 0,"Data": 0},
		"C77": {"sub": 1,"stu": 0,"Data": 0},
		"C78": {"sub": 1,"stu": 0,"Data": 0},
		"C74": {"sub": 1,"stu": 0,"Data": 0}
	},
	"C100": {
		"STATU": {"devadd":00,"LINK": 0,"GROUP": 0},
		"C76": {"sub": 1,"stu": 0,"Data": 0},
		"C74": {"sub": 1,"stu": 0,"Data": 0}
	},
	"C200": {
		"STATU": {"devadd":00,"LINK": 0,"GROUP": 0},
		"C77": {"sub": 1,"stu": 0,"Data": 0},
		"C78": {"sub": 1,"stu": 0,"Data": 0},
		"C74": {"sub": 1,"stu": 0,"Data": 0}
	},
	"C300": {
		"STATU": {"devadd":00,"LINK": 0,"GROUP": 0},
		"C7A": {"sub": 1,"stu": 0,"Data": 0},
		"C74": {"sub": 1,"stu": 0,"Data": 0}
	},
	"C400": {
		"STATU": {"devadd":00,"LINK": 0,"GROUP": 0},
		"C7B": {"sub": 1,"stu": 0,"Data": 0},
		"C74": {"sub": 1,"stu": 0,"Data": 0}
	},
	"C500": {
		"STATU": {"devadd":00,"LINK": 0,"GROUP": 0},
		"C72": {"sub": 1,"stu": 0,"Data": 0},
		"C74": {"sub": 1,"stu": 0,"Data": 0}
	},
	"C600": {
		"STATU": {"devadd":00,"LINK": 0,"GROUP": 0},
		"C72": {"sub": 1,"stu": 0,"Data": 0},
		"C74": {"sub": 1,"stu": 0,"Data": 0}
	},
	"C700": {
		"STATU": {"devadd":00,"LINK": 0,"GROUP": 0},
		"C79": {"sub": 1,"stu": 0,"Data": 0},
		"C74": {"sub": 1,"stu": 0,"Data": 0}
	},
	"C800": {
		"STATU": {"devadd":00,"LINK": 0,"GROUP": 0},
		"C71": {"sub": 1,"stu": 0,"Data": 0},
		"C7C": {"sub": 1,"stu": 0,"Data": 0},
		"C74": {"sub": 1,"stu": 0,"Data": 0}
	},
	"C900": {
		"STATU": {"devadd":00,"LINK": 0,"GROUP": 0},
		"C71": {"sub": 1,"stu": 0,"Data": 0},
		"C74": {"sub": 1,"stu": 0,"Data": 0}
	},
	"CA00": {
		"STATU": {"devadd":00,"LINK": 0,"GROUP": 0},
		"C79": {"sub": 1,"stu": 0,"Data": 0},
		"C74": {"sub": 1,"stu": 0,"Data": 0}
	},
	"CB00": {
		"STATU": {"devadd":00,"LINK": 0,"GROUP": 0},
		"C77": {"sub": 1,"stu": 0,"Data": 0},
		"C79": {"sub": 1,"stu": 0,"Data": 0},
		"C74": {"sub": 1,"stu": 0,"Data": 0}
	},
	"D010": {
		"STATU": {"devadd":00,"LINK": 0,"GROUP": 0,"MACADD":"000000000000"},
		"C71": {"sub": 1,"stu": 0,"Data": 0},
		"C72": {"sub": 1,"stu": 0,"Data": 0},
		"C73": {"sub": 1,"stu": 0,"Data": 0},
		"C7C": {"sub": 1,"stu": 0,"Data": 0},
		"C7E": {"sub": 1,"stu": 0,"Data": 0},
		"C74": {"sub": 1,"stu": 0,"Data": 0}
	},
	"D020": {
		"STATU": {"devadd":00,"LINK": 0,"GROUP": 0,"MACADD":"000000000000"},
		"C71": {"sub": 1,"stu": 0,"Data": 0},
		"C72": {"sub": 1,"stu": 0,"Data": 0},
		"C73": {"sub": 1,"stu": 0,"Data": 0},
		"C7C": {"sub": 1,"stu": 0,"Data": 0},
		"C7E": {"sub": 1,"stu": 0,"Data": 0},
		"C74": {"sub": 1,"stu": 0,"Data": 0}
	},
	"D030": {
		"STATU": {"devadd":00,"LINK": 0,"GROUP": 0,"MACADD":"000000000000"},
		"C71": {"sub": 1,"stu": 0,"Data": 0},
		"C72": {"sub": 1,"stu": 0,"Data": 0},
		"C73": {"sub": 1,"stu": 0,"Data": 0},
		"C7C": {"sub": 1,"stu": 0,"Data": 0},
		"C7E": {"sub": 1,"stu": 0,"Data": 0},
		"C74": {"sub": 1,"stu": 0,"Data": 0}
	},
	"D040": {
		"STATU": {"devadd":00,"LINK": 0,"GROUP": 0,"MACADD":"000000000000"},
		"C71": {"sub": 1,"stu": 0,"Data": 0},
		"C72": {"sub": 1,"stu": 0,"Data": 0},
		"C73": {"sub": 1,"stu": 0,"Data": 0},
		"C7C": {"sub": 1,"stu": 0,"Data": 0},
		"C7E": {"sub": 1,"stu": 0,"Data": 0},
		"C74": {"sub": 1,"stu": 0,"Data": 0}
	},
	"D050": {
		"STATU": {"devadd":00,"LINK": 0,"GROUP": 0,"MACADD":"000000000000"},
		"C71": {"sub": 1,"stu": 0,"Data": 0},
		"C72": {"sub": 1,"stu": 0,"Data": 0},
		"C73": {"sub": 1,"stu": 0,"Data": 0},
		"C7C": {"sub": 1,"stu": 0,"Data": 0},
		"C7E": {"sub": 1,"stu": 0,"Data": 0},
		"C74": {"sub": 1,"stu": 0,"Data": 0}
	},
	"D060": {
		"STATU": {"devadd":00,"LINK": 0,"GROUP": 0,"MACADD":"000000000000"},
		"C71": {"sub": 1,"stu": 0,"Data": 0},
		"C72": {"sub": 1,"stu": 0,"Data": 0},
		"C73": {"sub": 1,"stu": 0,"Data": 0},
		"C7C": {"sub": 1,"stu": 0,"Data": 0},
		"C7E": {"sub": 1,"stu": 0,"Data": 0},
		"C74": {"sub": 1,"stu": 0,"Data": 0}
	},
	"D070": {
		"STATU": {"devadd":00,"LINK": 0,"GROUP": 0,"MACADD":"000000000000"},
		"C71": {"sub": 1,"stu": 0,"Data": 0},
		"C72": {"sub": 1,"stu": 0,"Data": 0},
		"C73": {"sub": 1,"stu": 0,"Data": 0},
		"C7C": {"sub": 1,"stu": 0,"Data": 0},
		"C7E": {"sub": 1,"stu": 0,"Data": 0},
		"C74": {"sub": 1,"stu": 0,"Data": 0}
	},
	"D080": {
		"STATU": {"devadd":00,"LINK": 0,"GROUP": 0,"MACADD":"000000000000"},
		"C71": {"sub": 1,"stu": 0,"Data": 0},
		"C72": {"sub": 1,"stu": 0,"Data": 0},
		"C73": {"sub": 1,"stu": 0,"Data": 0},
		"C7C": {"sub": 1,"stu": 0,"Data": 0},
		"C7E": {"sub": 1,"stu": 0,"Data": 0},
		"C74": {"sub": 1,"stu": 0,"Data": 0}
	},
	"D090": {
		"STATU": {"devadd":00,"LINK": 0,"GROUP": 0,"MACADD":"000000000000"},
		"C71": {"sub": 1,"stu": 0,"Data": 0},
		"C72": {"sub": 1,"stu": 0,"Data": 0},
		"C73": {"sub": 1,"stu": 0,"Data": 0},
		"C7C": {"sub": 1,"stu": 0,"Data": 0},
		"C7E": {"sub": 1,"stu": 0,"Data": 0},
		"C74": {"sub": 1,"stu": 0,"Data": 0}
	},
	"D100": {
		"STATU": {"devadd":00,"LINK": 0,"GROUP": 0,"MACADD":"000000000000"},
		"C71": {"sub": 1,"stu": 0,"Data": 0},
		"C72": {"sub": 1,"stu": 0,"Data": 0},
		"C73": {"sub": 1,"stu": 0,"Data": 0},
		"C7C": {"sub": 1,"stu": 0,"Data": 0},
		"C7E": {"sub": 1,"stu": 0,"Data": 0},
		"C74": {"sub": 1,"stu": 0,"Data": 0}
	}
}

exports.rs485v029 = rs485v029
exports.subcmdtype = subcmdtype
exports.apicmdtype = apicmdtype
exports.r485subcmd = r485subcmd
exports.R485CMDDATA = R485CMDDATA
exports.devtypelib = devtypelib
exports.devtablib = devtablib
