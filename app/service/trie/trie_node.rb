require 'json'

class TrieNode < ApplicationService
  attr_reader :value, :children, :is_end
  attr_writer :is_end

  def initialize(word)
    @value = word
    @children = {}
    @is_end = false
  end

  def to_s
    "{'word' : #{value}, 'isEnd' : #{is_end}, 'children' : #{JSON.pretty_generate(children)}"
  end
end
