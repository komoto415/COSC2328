// This class contains implementation for a card and a deck

// This defines a single card. It has three attributes:
// Suit, one of Clubs, Diamonds, Hearts, or Spades
// Face, a value from 2-14
// Icon, an image file associated with the card
function Card(suit, val, my_img) {
    this.suit = suit;
    this.face = val;
    this.icon = my_img;
}


// This function defines a Deck object
// It possesses three attributes and two methods
// Deck, an array representation of the standard 52 card deck
// Count, the current entry in the array we are at
// Back_Image, the back of each playing card
// Shuffle, a function which shuffles the deck
// Deal, a function which deals
function Deck() {
    this.deck = fill_deck();
    this.count = 0;
    this.back_image = "Deck/Gray_back.jpg";
    this.shuffle = function() {
        for (i = 0; i < 7; i++) {
            shuffle(this.deck);
        }
        this.count = 0;
    }
    this.deal = function() {
        if (this.count == 52) {
            this.count = 0;
            for (i = 0; i < 7; i++) {
                shuffle(this.deck);
            }
        }
        var result = this.deck[this.count];
        this.count += 1;
        return result;
    }
}

function fill_deck() {
    var deck = [];
    for (i = 2; i <= 14; i++) {
        heart_name = "Deck/" + i + "H.jpg";
        club_name = "Deck/" + i + "C.jpg";
        diamond_name = "Deck/" + i + "D.jpg";
        spade_name = "Deck/" + i + "S.jpg";
        deck.push(new Card("Hearts", i, heart_name));
        deck.push(new Card("Clubs", i, club_name));
        deck.push(new Card("Diamonds", i, diamond_name));
        deck.push(new Card("Spades", i, spade_name));
    }
    for (i = 0; i < 7; i++) {
        shuffle(deck);
    }

    return deck;
}


function shuffle(array) {
    var i = 0,
        j = 0,
        temp = null

    for (i = array.length - 1; i > 0; i -= 1) {
        j = Math.floor(Math.random() * (i + 1))
        temp = array[i]
        array[i] = array[j]
        array[j] = temp
    }
}

function get_top_card(array) {
    if (array.length === 0) {
        fill_deck();
    }
    return array.pop();
}