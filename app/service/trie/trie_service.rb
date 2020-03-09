require_relative './trie_node'

class TrieStruct < ApplicationService
  DICTIONARY_FILEPATH = Rails.root.join('dictionary','new_dict.txt')

  def initialize(dict_path)
    dict_path = dict_path.empty? ? DICTIONARY_FILEPATH : dict_path
    @root = TrieNode.new("")
    file = File.open(dict_path)
    file.readlines.each { |line| add_word_to_trie(line.gsub("\n","")) } # adding each word in the trie.
    file.close
  end

  def root
    @root
  end

  # Initializing the word dictionary in trie
  # def init
  #   @word_list.each do |word|
  #     add_word_to_trie(word)
  #   end
  # end

  # Adding each word in the trie
  def add_word_to_trie(word)
    chars = word.downcase.split('')
    crawl = root

    chars.each do |char|
      child = crawl.children
      if child.keys.include?(char)
        crawl = child[char]
      else
        temp = TrieNode.new(char)
        child[char] = temp
        crawl = temp
      end
    end
    crawl.is_end = true
  end

  # This function checks if word is present in dictionary
  def check_if_present(word)
    chars = word.downcase.split('')
    match = false
    char_count = 0
    crawl = root

    chars.each do |a_char|
      char_count += 1
      child = crawl.children
      if child.keys.include?(a_char)
        crawl = child[a_char]
        if crawl.is_end && (char_count == chars.length)
          match=true
        end
      else
        break;
      end
    end
    match # returns if the word is in dictionary or not.
  end

end