require 'test_helper'
require_relative '../../../app/service/trie/trie_service'

class TrieStructTest < ActiveSupport::TestCase
  test "check if trie data structure is initialized" do
    trie = TrieStruct.new(Rails.root.join('dictionary','test_dict.txt'))
    assert_not_nil trie.root
  end

  test "validate the word that is present in dictionary file" do
    trie = TrieStruct.new(Rails.root.join('dictionary','test_dict.txt'))
    assert trie.check_if_present('GOAL')
    assert trie.check_if_present('TAKE')
    assert trie.check_if_present('HIN')
    assert trie.check_if_present('DAD')
    assert trie.check_if_present('HIN')
    assert trie.check_if_present('WAIST')
  end

  test "validate the word that is not present in dictionary file" do
    trie = TrieStruct.new(Rails.root.join('dictionary','test_dict.txt'))
    assert_not trie.check_if_present('GIRL')
    assert_not trie.check_if_present('BOYS')
    assert_not trie.check_if_present('MOTHER')
    assert_not trie.check_if_present('FIST')
    assert_not trie.check_if_present('KILL')
  end

  test "check if new words can be added into the trie structure" do
    trie = TrieStruct.new(Rails.root.join('dictionary','test_dict.txt'))
    ["GIRL", "BOYS", "MOTHER", "FIST", "KILL"].each { |word| trie.add_word_to_trie(word)}
    assert trie.check_if_present('GIRL')
    assert trie.check_if_present('BOYS')
    assert trie.check_if_present('MOTHER')
    assert trie.check_if_present('FIST')
    assert trie.check_if_present('KILL')
  end
end
