const Word = require('../../models/word');
const PartOfSpeech = require('../../models/part-of-speech');

module.exports = {
  Word: {
    partsOfSpeech: async (word) => {
      const parts = await PartOfSpeech.find({ _id: { $in: word.partOfSpeechIds } }) || [];
      return parts;
    },
  },

  Query: {
    allWords: () => Word.find(),
    word: (_, { input }) => {
      const { id } = input;
      return Word.findById(id);
    },
  },
  Mutation: {
    createWord: (_, { input }) => {
      const {
        name,
        definition,
        note,
        partOfSpeechIds,
      } = input;
      return Word.create({
        name,
        definition,
        note,
        partOfSpeechIds,
      });
    },
    updateWord: async (_, { input }) => {
      const { id, payload } = input;
      const word = await Word.findById(id);
      word.set(payload);
      return word.save();
    },
    deleteWord: async (_, { input }) => {
      const { id } = input;
      await Word.remove({ _id: id });
      return true;
    },
  },
};