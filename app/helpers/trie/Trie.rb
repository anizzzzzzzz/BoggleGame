require_relative './TrieNode'

class Trie
  def initialize(word_list)
    @root = TrieNode.new("")
    @word_list = word_list.sort
  end

  def root
    @root
  end

  # Initializing the word dictionary in trie
  def init
    @word_list.each do |word|
      self.add_word_to_trie(word)
    end
  end

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