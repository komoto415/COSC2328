var deck, player1Hand, player2Hand, p1O, p2O, revealed, p1Disc, p2Disc;
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
    p1O = {};
    p2O = {};
    p1Disc = [];
    p2Disc = [];


    for (var i = 0; i < 5; i++) {
        let card = deck.deck.pop()
        player1Hand.push(card);
        card = deck.deck.pop()
        player2Hand.push(card);
    }
    document.getElementById('win').innerHTML = '';
    document.getElementById('reveal').disabled = false;
    revealed = false;
}

function updateHand(hand, p) {
    for (var i = 0; i < 5; i++) {
        let imgSrc = "p" + p + "Hand" + i;
        if (p == 1) {
            document.getElementById(imgSrc).src = player1Hand[i].icon;
        }
        if (p == 2) {
            document.getElementById(imgSrc).src = player2Hand[i].icon;
        }
    }
}

function revealHands() {
    updateHand(player1Hand, 1);
    updateHand(player1Hand, 2);
    revealed = true;
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
    */
    var p1HandLen = Object.keys(p1O).length;
    var p1HandType = myHandType(player1Hand, p1O);

    var p2HandLen = Object.keys(p2O).length;
    var p2HandType = myHandType(player2Hand, p2O);

    console.log(p1HandType);
    console.log(p2HandType);

    p1HandType = convertTypeToNum(p1HandType);
    p2HandType = convertTypeToNum(p2HandType);

    console.log(p1HandType);
    console.log(p2HandType);

    var whoWon = comapareHandType(p1HandType, p2HandType);
    switch (whoWon) {
        case "p1":
            playerWinUpdate();
            break;
        case "p2":
            michaelsWinUpdate();
            break;
    }
    document.getElementById('reveal').disabled = true;
}

function potentialDiscard(me) {
    if (revealed) {
        switch (me.id) {
            case "p1Hand0":
            case "p1Hand1":
            case "p1Hand2":
            case "p1Hand3":
            case "p1Hand4":
                cardToDiscard(me, p1Disc);
                break;
            case "p2Hand0":
            case "p2Hand1":
            case "p2Hand2":
            case "p2Hand3":
            case "p2Hand4":
                cardToDiscard(me, p2Disc);
                break;

        }
    }
}

function cardToDiscard(me, discList) {
    let str = me.src;
    str = str.split('/');
    str = str[str.length - 2] + "/" + str[str.length - 1];
    let cardNum = parseInt(me.id[me.id.length - 1]) + 1
    if (discList.includes(str)) {
        discList.pop(str);
        alert("You've opted not to dicard card number " + (cardNum))
    } else {
        discList.push(str);
        alert("You've opted to potentially dicard card number " + (cardNum) + ". Please press the" +
            " discard button when you're ready to discard")
    }
}

function discard(me) {
    let count = 0;
    switch (me.id) {
        case "discard1":
            count = moveDiscToDeck(player1Hand, p1Disc);
            deck.shuffle();
            addNCardsToHand(player1Hand, count);
            break;
        case "discard2":
            count = moveDiscToDeck(player2Hand, p2Disc);
            deck.shuffle();
            addNCardsToHand(player2Hand, count);
            break;
    }
    updateHand(player1Hand, 1);
    updateHand(player2Hand, 2);
    document.getElementById('reveal').disabled = false;
    document.getElementById('win').innerHTML = "";
    p1O = {};
    p2O = {};
    p1Disc = [];
    p2Disc = [];
    evaluateHands();
}

function moveDiscToDeck(hand, disc) {
    let count = 0;
    for (var i = 0; i < disc.length; i++) {
        for (var j = 0; j < hand.length; j++) {
            if (hand[j].icon == disc[i]) {
                let discarded = hand.splice(j, 1);
                deck.deck.push(discarded);
                count++
            }
        }
    }
    return count;
}

function addNCardsToHand(hand, n) {
    for (var i = 0; i < n; i++) {
        let card = deck.deck.pop();
        hand.push(card);
    }
}

function comapareHandType(p1Hand, p2Hand) {
    let whoWon = "";
    if (p1Hand == p2Hand) {
        let compare1;
        let compare2;
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
                break;
            case 2: // single pair case
                /*
                    for (key in p1O) {
                        if (p1O[key] == 2) {
                            compare1 = key;
                        }
                    }
                    for (key in p2O) {
                        if (p2O[key] == 2) {
                            compare2 = key;
                        }
                    }
                    */
                compare1 = getHandResolver(p1O, 2);
                compare2 = getHandResolver(p2O, 2);
                break;
            case 7: //  fullhouse case
            case 4: // triple case
                /*
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
                    */
                compare1 = getHandResolver(p1O, 3);
                compare2 = getHandResolver(p2O, 3);
                break;
            case 8: // four of a kind case
                /*
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
                    */
                compare1 = getHandResolver(p1O, 4);
                compare2 = getHandResolver(p2O, 4);
                break;
            case 10: // royal flush case
            case 9: // straight flush case
            case 6: // flush case
            case 5: // straight case
            case 1: // single case
                /*
                    for (key in p1O) {
                        compare1 = key;
                    }
                    for (key in p2O) {
                        compare2 = key;
                    }
                    */
                compare1 = getHandResolver(p1O, 1);
                compare2 = getHandResolver(p2O, 1);
                break;
        }
        compare1 = parseInt(compare1);
        compare2 = parseInt(compare2);
        if (compare1 > compare2) {
            whoWon = "p1";
        } else if (compare1 < compare2) {
            whoWon = "p2";
        } else if (compare1 == compare2) {
            whoWon = compareN(compare1, compare2);
        }
    } else if (p1Hand > p2Hand) {
        whoWon = "p1"
    } else if (p1Hand < p2Hand) {
        whoWon = "p2"
    }
    return whoWon
}

function getHandResolver(handDict, type) {
    let ret;
    for (key in handDict) {
        if (handDict[key] == type) {
            ret = key;
        }
    }
    return ret;
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
        case "singlePair":
            return 2
        case "singles":
            return 1
    }
}

function michaelsWinUpdate() {
    document.getElementById('win').innerHTML = "Michaels has won this round!"
    p2Wins++;
    document.getElementById('p2Wins').innerHTML = "Wins: " + p2Wins;
}

function playerWinUpdate() {
    document.getElementById('win').innerHTML = "Player has won this round!"
    p1Wins++;
    document.getElementById('p1Wins').innerHTML = "Wins: " + p1Wins;
}

function getSingle(singleList) {
    return singleList[0];
}

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
    return compare1;
}

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
    if (cardP1 > cardP2) {
        return "p1";
    } else if (cardP1 < cardP2) {
        return "p2"
    } else if (cardP1 == cardP2) {
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
            case 1:
                compare1 = getSingle(suits1);
                compare2 = getSingle(suits2);
                break;
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