var deck = new Deck();
var player1Hand = [];
var player2Hand = [];
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
    let p1O = {};
    let p2O = {};
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

    // What kind of hands do they have
    /*
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
            console.log("Player has only singles or a stright");
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
    */
    var p1HandLen = Object.keys(p1O).length;
    var p2HandLen = Object.keys(p2O).length;
    if (p2HandLen > p1HandLen) {
        playerWinUpdate();
    } else if (p2HandLen < p1HandLen) {
        michaelsWinUpdate();
    } else if (p1HandLen == p2HandLen) {
        let type = "";
        let length = p1HandLen;
        document.getElementById('win').innerHTML = "Ties for now need to FIXXXXXX :C. isStraight works"

        p1Hand = myHandType(player1Hand, p1O);
        p2Hand = myHandType(player2Hand, p2O);
        console.log(p1Hand);
        console.log(p2Hand);
        if (p1Hand == "singles" && p2Hand == "singles") {
            p1Won = singlesWin(p1O, p2O);
            if (p1Won) {
                playerWinUpdate();
            }
            if (!p1Won) {
                michaelsWinUpdate();
            }
        }
        document.getElementById('reveal').disabled = true;
    }
}

function myHandType(handList, handDict) {
    let type = "";
    let handLength = Object.keys(handDict).length;
    switch (handLength) {
        case 2:
            // console.log("Player has a four of a kind or a fullhouse");
            type = isFullhouseOrFour(handDict);
            console.log(type)
            return type;
        case 3:
            // console.log("Player has a triple or a double pair");
            type = isDoubelPairOrTriple(handDict);
            console.log(type)
            return type;
        case 4:
            // console.log("Player has one pair");
            type = "singlePair";
            console.log(type)
            return type;
        case 5:
            // console.log("Player has only singles or a stright or a flush");
            type += isStraight(handDict) + isFlush(handList)
            if (type == "") {
                type = "singles"
            }
            console.log(type)
            return type;
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

function singlesWin(p1O, p2O) {
    let max1 = -1;
    let max2 = -1;
    for (key in p1O) {
        max1 = key;
    }
    console.log(max1);
    for (key in p2O) {
        max2 = key;
    }
    console.log(max2);
    if (max1 > max2) {
        return true;
    } else if (max1 == max2) {
        let cardP1 = "";
        let cardP2 = "";
        for (var i = 0; i < 5; i++) {
            if (player1Hand[i].face == max1) {
                cardP1 = player1Hand[i].suit;
            }
        }
        for (var i = 0; i < 5; i++) {
            if (player2Hand[i].face == max2) {
                cardP2 = player1Hand[i].suit;
            }
        }
        console.log(cardP1);
        console.log(cardP2);
        p1Won = compareSuits(cardP1, cardP2);
        switch (p1Won) {
            case "player1":
                console.log("Player 1 wins");
                break;
            case "player2":
                console.log("Michaels wins");
                break;
        }
    }
    return false;
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

function isStraight(test) {
    justFace = []
    index = 0;
    for (key in test) {
        justFace[index] = key;
        index++;
    }
    for (var i = 0; i < 4; i++) {
        if (justFace[i] <= justFace[i + 1]) {
            return "";
        }
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