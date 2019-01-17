let notes = [
	// (C1 - E1 don't register with pitchfinder using the YIN or AMDF recognition algorithms)
	{
		name: 'C1',
		hz: {
			min: 33,
			max: 34
		}
	},
	{
		name: 'C#1',
		hz: {
			min: 35,
			max: 36
		}
	},
	{
		name: 'D1',
		hz: {
			min: 37,
			max: 38
		}
	},
	{
		name: 'D#1',
		hz: {
			min: 39,
			max: 40
		}
	},
	{
		name: 'E1',
		hz: {
			min: 41,
			max: 42
		}
	},
	{
		name: 'F1',
		hz: {
			min: 43,
			max: 45
		}
	},
	{
		name: 'F#1',
		hz: {
			min: 46,
			max: 47
		}
	},
	{
		name: 'G1',
		hz: {
			min: 48,
			max: 50
		}
	},
	{
		name: 'G#1',
		hz: {
			min: 51,
			max: 53
		}
	},
	{
		name: 'A1',
		hz: {
			min: 54,
			max: 56
		}
	},
	{
		name: 'A#1',
		hz: {
			min: 57,
			max: 60
		}
	},
	{
		name: 'B1',
		hz: {
			min: 61,
			max: 64
		}
	},
	{
		name: 'C2',
		hz: {
			min: 65,
			max: 67
		}
	},
	{
		name: 'C#2',
		hz: {
			min: 68,
			max: 71
		}
	},
	{
		name: 'D2',
		hz: {
			min: 72,
			max: 76
		}
	},
	{
		name: 'D#2',
		hz: {
			min: 77,
			max: 80
		}
	},
	{
		name: 'E2',
		hz: {
			min: 81,
			max: 85
		}
	},
	{
		name: 'F2',
		hz: {
			min: 86,
			max: 90
		}
	},
	{
		name: 'F#2',
		hz: {
			min: 91,
			max: 95
		}
	},
	{
		name: 'G2',
		hz: {
			min: 96,
			max: 101
		}
	},
	{
		name: 'G#2',
		hz: {
			min: 102,
			max: 107
		}
	},
	{
		name: 'A2',
		hz: {
			min: 108,
			max: 113
		}
	},
	{
		name: 'A#2',
		hz: {
			min: 114,
			max: 120
		}
	},
	{
		name: 'B2',
		hz: {
			min: 121,
			max: 127
		}
	},
	{
		name: 'C3',
		hz: {
			min: 128,
			max: 135
		}
	},
	{
		name: 'C#3',
		hz: {
			min: 136,
			max: 143
		}
	},
	{
		name: 'D3',
		hz: {
			min: 144,
			max: 151
		}
	},
	{
		name: 'D#3',
		hz: {
			min: 152,
			max: 160
		}
	},
	{
		name: 'E3',
		hz: {
			min: 161,
			max: 170
		}
	},
	{
		name: 'F3',
		hz: {
			min: 171,
			max: 180
		}
	},	
	{
		name: 'F#3',
		hz: {
			min: 181,
			max: 191
		}
	},
	{
		name: 'G3',
		hz: {
			min: 192,
			max: 202
		}
	},
	{
		name: 'G#3',
		hz: {
			min: 203,
			max: 214
		}
	},
	{
		name: 'A3',
		hz: {
			min: 215,
			max: 227
		}
	},
	{
		name: 'A#3',
		hz: {
			min: 228,
			max: 240
		}
	},
	{
		name: 'B3',
		hz: {
			min: 241,
			max: 254
		}
	},
	{
		name: 'C4',
		hz: {
			min: 255,
			max: 269
		}
	},
	{
		name: 'C#4',
		hz: {
			min: 270,
			max: 285
		}
	},
	{
		name: 'D4',
		hz: {
			min: 286,
			max: 302
		}
	},
	{
		name: 'D#4',
		hz: {
			min: 303,
			max: 320
		}
	},
	{
		name: 'E4',
		hz: {
			min: 321,
			max: 339
		}
	},
	{
		name: 'F4',
		hz: {
			min: 340,
			max: 360
		}
	},
	{
		name: 'F#4',
		hz: {
			min: 361,
			max: 381
		}
	},
	{
		name: 'G4',
		hz: {
			min: 382,
			max: 404
		}
	},
	{
		name: 'G#4',
		hz: {
			min: 405,
			max: 428
		}
	},
	{
		name: 'A4',
		hz: {
			min: 429,
			max: 453
		}
	},
	{
		name: 'A#4',
		hz: {
			min: 454,
			max: 480
		}
	},
	{
		name: 'B4',
		hz: {
			min: 481,
			max: 509
		}
	},
	{
		name: 'C5',
		hz: {
			min: 510,
			max: 539
		}
	},
	{
		name: 'C#5',
		hz: {
			min: 540,
			max: 571
		}
	},
	{
		name: 'D5',
		hz: {
			min: 572,
			max: 605
		}
	},
	{
		name: 'D#5',
		hz: {
			min: 606,
			max: 641
		}
	},
	{
		name: 'E5',
		hz: {
			min: 642,
			max: 679
		}
	},
	{
		name: 'F5',
		hz: {
			min: 680,
			max: 719
		}
	},
	{
		name: 'F#5',
		hz: {
			min: 720,
			max: 762
		}
	},
	{
		name: 'G5',
		hz: {
			min: 763,
			max: 807
		}
	},
	{
		name: 'G#5',
		hz: {
			min: 808,
			max: 855
		}
	},
	{
		name: 'A5',
		hz: {
			min: 856,
			max: 906
		}
	},
	{
		name: 'A#5',
		hz: {
			min: 907,
			max: 960
		}
	},
	{
		name: 'B5',
		hz: {
			min: 961,
			max: 1017
		}
	},
	{
		name: 'C6',
		hz: {
			min: 1018,
			max: 1078
		}
	},
	{
		name: 'C#6',
		hz: {
			min: 1079,
			max: 1142
		}
	},
	{
		name: 'D6',
		hz: {
			min: 1143,
			max: 1210
		}
	},
	{
		name: 'D#6',
		hz: {
			min: 1211,
			max: 1282
		}
	},
	{
		name: 'E6',
		hz: {
			min: 1283,
			max: 1358
		}
	},
	{
		name: 'F6',
		hz: {
			min: 1359,
			max: 1439
		}
	},
	{
		name: 'F#6',
		hz: {
			min: 1440,
			max: 1524
		}
	},
	{
		name: 'G6',
		hz: {
			min: 1525,
			max: 1615
		}
	},
	{
		name: 'G#6',
		hz: {
			min: 1616,
			max: 1711
		}
	},
	{
		name: 'A6',
		hz: {
			min: 1712,
			max: 1813
		}
	},
	{
		name: 'A#6',
		hz: {
			min: 1814,
			max: 1921
		}
	},
	{
		name: 'B6',
		hz: {
			min: 1922,
			max: 2035
		}
	},
	{
		name: 'C7',
		hz: {
			min: 2036,
			max: 2155
		}
	}
]; 

export default notes;