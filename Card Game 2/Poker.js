var deck = new Deck();
var player1Hand = [];
var player2Hand = [];
var p1O = {};
var p2O = {};
var p1Wins = 0;
var p2Wins = 0;

function nextRound() {
    for (var p = 1; p < 3; p++) {
        for (var i = 0; i < 5; i++) {
            let imgSrc = "p" + p + "Hand" + i;
            document.getElementById(imgSrc).src = "./Deck/Purple_back.jpg";
        }
    }
    deck = new Deck();
    player1Hand = [];
    player2Hand = [];

    for (var i = 0; i < 5; i++) {
        let card = deck.deck.pop()
        player1Hand.push(card);
        card = deck.deck.pop()
        player2Hand.push(card);
    }
    document.getElementById('win').innerHTML = '';
    document.getElementById('reveal').disabled = false;
}

function revealHands() {
    for (var p = 1; p < 3; p++) {
        for (var i = 0; i < 5; i++) {
            let imgSrc = "p" + p + "Hand" + i;
            if (p == 1) {
                document.getElementById(imgSrc).src = player1Hand[i].icon;
            }
            if (p == 2) {
                document.getElementById(imgSrc).src = player2Hand[i].icon
            }
        }
    }
}

function evaluateHands() {
    for (var i = 0; i < 5; i++) {
        count = 1
        if (player1Hand[i].face in p1O) {
            count = p1O[player1Hand[i].face];
            count++;
        }
        p1O[player1Hand[i].face] = count;

        count = 1
        if (player2Hand[i].face in p2O) {
            count = p2O[player2Hand[i].face];
            count++;
        }
        p2O[player2Hand[i].face] = count;
    }

    switch (Object.keys(p1O).length) {
        case 2:
            console.log("Player has a four of a kind or a fullhouse");
            break;
        case 3:
            console.log("Player has a triple or a double pair");
            break;
        case 4:
            console.log("Player has one pair");
            break;
        case 5:
            console.log("Player has only singles or a straight");
            break;
    }
    switch (Object.keys(p2O).length) {
        case 2:
            console.log("Michaels has a four of a kind or a fullhouse");
            break;
        case 3:
            console.log("Michaels has a triple or a double pair");
            break;
        case 4:
            console.log("Michaels has one pair");
            break;
        case 5:
            console.log("Michaels has only singles or a straight");
            break;
    }

    var p1HandLen = Object.keys(p1O).length;
    var p1HandType = myHandType(player1Hand, p1O);

    var p2HandLen = Object.keys(p2O).length;
    var p2HandType = myHandType(player2Hand, p2O);

    console.log(p1HandType);
    console.log(p2HandType);

    p1HandType = convertTypeToNum(p1HandType);
    p2HandType = convertTypeToNum(p2HandType);

    var whoWon = comapareHandType(p1HandType, p2HandType);

    /*
    // These are good enough for non extra credit
    if (p2HandLen > p1HandLen) {
        playerWinUpdate();
    } else if (p2HandLen < p1HandLen) {
        michaelsWinUpdate();
    }
    */
    document.getElementById('reveal').disabled = true;
}

function comapareHandType(p1Hand, p2Hand) {
    whoWon = ""
    if (p1Hand == p2Hand) {
        whoWon = "need to implement same hand type tie breaker"
        console.log(whoWon);
        let compare1 = -1;
        let compare2 = -1;
        switch (p1Hand) {
            case 3: // double pair case
                let dPair1 = [];
                let dPair2 = [];
                for (key in p1O) {
                    if (p1O[key] == 2) {
                        dPair1.push(key);
                    }
                }
                for (key in p2O) {
                    if (p2O[key] == 2) {
                        dPair2.push(key);
                    }
                }
                compare1 = Math.max(dPair1);
                compare2 = Math.max(dPair2);
                whoWon = compareN(compare1, compare2);
                break;
            case 2: // single pair case
                for (key in p1O) {
                    if (p1O[key] == 2) {
                        compare1 = key;
                    }
                }
                for (key in p2O) {
                    if (p2O[key] == 2) {
                        compare1 = key;
                    }
                }
                whoWon = compareN(compare1, compare2);
                break;

            case 7: //  fullhouse case
            case 4: // triple case
                for (key in p1O) {
                    if (p1O[key] == 3) {
                        compare1 = key;
                    }
                }
                for (key in p2O) {
                    if (p2O[key] == 3) {
                        compare2 = key;
                    }
                }
                whoWon = compareN(compare1, compare2);
                break;
            case 8: // four of a kind case
                for (key in p1O) {
                    if (p1O[key] == 4) {
                        compare1 = key;
                    }
                }
                for (key in p2O) {
                    if (p2O[key] == 4) {
                        compare2 = key;
                    }
                }
                whoWon = compareN(compare1, compare2);
                break;
            case 10: // royal flush case
            case 9: // straight flush case
            case 6: // flush case
            case 5: // straight case
            case 1: // single case
                for (key in p1O) {
                    compare1 = key;
                }
                for (key in p2O) {
                    compare2 = key;
                }
                break;
                whoWon = compareSingles(compare1, compare2);
        }
    } else if (p1Hand > p2Hand) {
        whoWon = "p1"
    } else if (p1Hand < p2Hand) {
        whoWon = "p2"
    }
    return whoWon
}

function getNthCase(n, dict) {
    console.log("not yet implemented");
}

function myHandType(handList, handDict) {
    let type = "";
    let handLength = Object.keys(handDict).length;
    switch (handLength) {
        case 2:
            type = isFullhouseOrFour(handDict);
            return type;
        case 3:
            type = isDoubelPairOrTriple(handDict);
            return type;
        case 4:
            type = "singlePair";
            return type;
        case 5:
            type += isStraight(handList, handDict) + isFlush(handList)
            if (type == "") {
                type = "singles"
            }
            return type;
    }
}

function convertTypeToNum(handType) {
    switch (handType) {
        case "royalflush":
            return 10
        case "straightflush":
            return 9
        case "four":
            return 8
        case "fullhouse":
            return 7
        case "flush":
            return 6
        case "straight":
            return 5
        case "triple":
            return 4
        case "doublePair":
            return 3
        case "pair":
            return 2
        case "singles":
            return 1
    }
}

function michaelsWinUpdate() {
    document.getElementById('win').innerHTML = "Michaels has won this round!"
    p2Wins++;
    console.log(p2Wins);
    document.getElementById('p2Wins').innerHTML = "Wins: " + p2Wins;
}

function playerWinUpdate() {
    document.getElementById('win').innerHTML = "Player has won this round!"
    p1Wins++;
    console.log(p1Wins);
    document.getElementById('p1Wins').innerHTML = "Wins: " + p1Wins;
}

function compareSingles(cardP1, cardP2) {
    if (cardP1 > cardP2) {
        return "p1";
    } else if (cardP1 == cardP2) {
        let cardP1 = "";
        for (var i = 0; i < 5; i++) {
            if (player1Hand[i].face == cardP1) {
                cardP1 = player1Hand[i].suit;
            }
        }

        let cardP2 = "";
        for (var i = 0; i < 5; i++) {
            if (player2Hand[i].face == cardP2) {
                cardP2 = player1Hand[i].suit;
            }
        }

        let whoWon = compareSuits(cardP1, cardP2);
        switch (whoWon) {
            case "player1":
                return "p1";
            case "player2":
                return "p2";
        }
    }
    return "p2";
}
//
// function compareDoubles(cardP1, cardP2) {
//     let pair1 = [];
//     for (var i = 0; i < 5; i++) {
//         if (player1Hand[i].face == cardP1) {
//             pair1.push(player1Hand[i].suit);
//         }
//     }
//
//     let pair2 = [];
//     for (var i = 0; i < 5; i++) {
//         if (player2Hand[i].face == cardP2) {
//             pair2.push(player2Hand[i].suit);
//         }
//     }
//     compare1 = getDouble(pair1);
//     compare2 = getDouble(pair2);
//     let whoWon = compareSuits(compare1, compare2);
//     switch (whoWon) {
//         case "player1":
//             return "p1"
//         case "player2":
//             return "p2"
//     }
// }
//
function getDouble(doubleList) {
    let pair_0 = doubleList[0];
    let pair_1 = doubleList[1]
    let compare1 = compareSuits(pair_0, pair_1);
    switch (compare1) {
        case "player1":
            compare1 = pair_0;
            break;
        case "player2":
            compare1 = pair_1;
            break;
    }
    return comapre1;
}
//
// function compareTriples(cardP1, cardp2) {
//     let triple1 = [];
//     let triple2 = [];
//     for (var i = 0; i < 5; i++) {
//         if (player1Hand[i].face == cardP1) {
//             triple1.push(player1Hand[i].suit);
//         }
//     }
//     for (var i = 0; i < 5; i++) {
//         if (player2Hand[i].face == cardP2) {
//             triple2.push(player2Hand[i].suit);
//         }
//     }
//     compare1 = getTriple(triple1);
//     compare2 = getTriple(triple2);
//     let whoWon = compareSuits(comapre1, compare2);
//     switch (whoWon) {
//         case "player1":
//             return "p1"
//         case "player 2":
//             return "p2"
//     }
// }
//
function getTriple(tripleList) {
    let triple_0 = tripleList[0];
    let triple_1 = tripleList[1];
    let triple_2 = tripleList[2];
    let newCompare = compareSuits(triple_0, triple_1);
    switch (newCompare) {
        case "player1":
            newCompare = triple_0;
            break;
        case "player2":
            newCompare = triple_1;
            break;
    }
    let compare1 = compareSuits(newCompare, triple_2);
    switch (compare1) {
        case "player1":
            compare1 = newCompare
            break;
        case "player2":
            compare1 = triple_2;
            break;
    }
    return compare1;
}
//
// function compareFour(cardP1, cardP2) {
//     let four1 = [];
//     let four2 = [];
//     for (var i = 0; i < 5; i++) {
//         if (player1Hand[i].face == cardP1) {
//             four1.push(player1Hand[i].suit);
//         }
//     }
//     for (var i = 0; i < 5; i++) {
//         if (player2Hand[i].face == cardP2) {
//             four2.push(player2Hand[i].suit);
//         }
//     }
//     let compare1 = getFour(four1);
//     let compare2 = getFour(four2);
//     let whoWon = compareSuits(compare1, compare2);
//     switch (whoWon) {
//         case "player1":
//             return "p1";
//         case "player2":
//             return "p2";
//     }
// }
//
function getFour(fourList) {
    let four_0 = fourList[0];
    let four_1 = fourList[1];
    let four_2 = fourList[2];
    let four_3 = fourList[3];
    let newCompare1 = compareSuits(four_0, four_1);
    switch (newCompare1) {
        case "player1":
            newCompare1 = four_0;
            break;
        case "player2":
            newCompare1 = four_1;
    }
    let newCompare2 = compareSuits(four_2, four_3);
    switch (newCompare2) {
        case "player1":
            newCompare2 = four_2;
            break;
        case "player2":
            newCompare2 = four_3;
            break;
    }
    let compare = compareSuits(newCompare1, newCompare2);
    switch (compare) {
        case "player1":
            compare = newCompare1;
            break;
        case "player2":
            compare = newCompare2;
            break;
    }
    return compare;
}

function compareN(cardP1, cardP2) {
    let suits1 = [];
    let suits2 = [];
    for (var i = 0; i < 5; i++) {
        if (player1Hand[i].face == cardP1) {
            suits1.push(player1Hand[i].suit);
        }
    }
    for (var i = 0; i < 5; i++) {
        if (player2Hand[i].face == cardP2) {
            suits2.push(player2Hand[i].suit);
        }
    }
    let compare1;
    let compare2;
    switch (suits1.length) {
        case 2:
            compare1 = getDouble(suits1);
            compare2 = getDouble(suits2);
            break;
        case 3:
            compare1 = getTriple(suits1);
            compare2 = getTriple(suits2);
            break;
        case 4:
            compare1 = getFour(suits1);
            compare2 = getFour(suits2);
            break;
    }
    let whoWon = compareSuits(compare1, compare2);
    switch (whoWon) {
        case "player1":
            return "p1";
        case "player2":
            return "p2";
    }
}

function compareSuits(card1Suit, card2Suit) {
    if (card1Suit == "Spades") {
        return "player1";
    } else if (card1Suit == "Daimonds" && card2Suit != "Spades") {
        return "player1";
    } else if (card1Suit == "Clubs" && card2Suit == "Hearts") {
        return "player1";
    } else {
        return "player2";
    }
}

function isFullhouseOrFour(test) {
    for (key in test) {
        if (test[key] == 3 || test[key] == 2) {
            return "fullhouse";
        }
    }
    return "four";
}

function isStraight(testList, test) {
    justFace = []
    for (key in test) {
        justFace.push(key);
    }
    for (var i = 0; i < 4; i++) {
        if (justFace[i] <= justFace[i + 1]) {
            return "";
        }
    }
    if (justFace[0] == 10 && isFlush(testList) == "flush") {
        return "royal"
    }
    return "straight"
}

function isFlush(test) {
    for (var i = 0; i < 4; i++) {
        if (test[i].suit != test[i + 1].suit) {
            return "";
        }
    }
    return "flush"
}

function isDoubelPairOrTriple(test) {
    for (key in test) {
        if (test[key] == 2) {
            return "doublePair";
        }
    }
    return "triple";
}