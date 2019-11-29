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

    if (Object.keys(p2O).length > Object.keys(p1O).length) {
        document.getElementById('win').innerHTML = "Player has won this round!"
        p1Wins++;
        console.log(p1Wins);
        document.getElementById('p1Wins').innerHTML = "Wins: " + p1Wins;
    }
    if (Object.keys(p2O).length < Object.keys(p1O).length) {
        document.getElementById('win').innerHTML = "Michaels has won this round!"
        p2Wins++;
        console.log(p2Wins);
        document.getElementById('p2Wins').innerHTML = "Wins: " + p2Wins;
    }
    // if (Object.keys(p2O).length == Object.keys(p1O).length) {
    //     let length = Object.keys(p2O).length;
    //     console.log(length);
    //     document.getElementById('win').innerHTML = "Tie for now need to FIXXXXXX :C"
    //     switch (length) {
    //         case 2:
    //             console.log("Both have four of a kinds");
    //             break;
    //         case 3:
    //             console.log("Both have a triple or a double pair");
    //             p1isDoublePair = isDoubelPair(p1O)
    //             if (p1isDoublePair) {
    //                 console.log("p1 is a double pair");
    //             } else {
    //                 console.log("p1 is a three of a kind");
    //             }
    //
    //             p2isDoublePair = isDoubelPair(p2O)
    //             if (p2isDoublePair) {
    //                 console.log("p2 is a double pair");
    //             } else {
    //                 console.log("p2 is a three of a kind");
    //             }
    //             break;
    //         case 4:
    //             console.log("Both only have a pair");
    //             break;
    //         case 5:
    //             p1isStraight = isStraight(p1O);
    //             if (p1isStraight) {
    //                 console.log("p1 is a straight");
    //             } else {
    //                 console.log("p1 is only singles");
    //             }
    //
    //             p2isStraight = isStraight(p2O);
    //             if (p2isStraight) {
    //                 console.log("p2 is a straight");
    //             } else {
    //                 console.log("p2 is only singles");
    //             }
    //
    //             if (p1isStraight && !p2isStraight) {
    //                 console.log("Player wins!");
    //             } else if (!p1isStraight && p2isStraight) {
    //                 console.log("Michaels wins!");
    //             } else if (!p1isStraight && !p2isStraight) {
    //                 console.log("now lets compare the highest single");
    //                 p1won = win(p1O, p2O);
    //                 if (p1won) {
    //                     console.log("Player wins!");
    //                 } else {
    //                     console.log("Michaels wins!");
    //                 }
    //             }
    //             break;
    //     }
    // }
}

function win(p1O, p2O) {
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
        console.log("Need to implement suit comparison");
        let cardP1 = "";
        let cardP2 = "";
        for (var i = 0; i < 5; i++) {
            if (player1Hand[i].face == max1) {
                cardP1 = i.suit;
            }
        }
        for (var i = 0; i < 5; i++) {
            if (player2Hand[i].face == max2) {
                cardP2 = i.suit;
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
        console.log("Player 1 Won!");

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

function isStraight(test) {
    justFace = []
    index = 0;
    for (key in test) {
        justFace[index] = key;
        index++;
    }
    for (var i = 0; i < 4; i++) {
        if (justFace[i] <= justFace[i + 1]) {
            return false;
        }
    }
    return true
}

function isDoubelPair(test) {
    for (key in test) {
        if (test[key] == 2) {
            return true;
        }
    }
    return false;
}