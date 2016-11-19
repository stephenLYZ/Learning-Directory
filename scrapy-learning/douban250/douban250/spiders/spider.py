import scrapy
from scrapy.spiders import CrawlSpider
from scrapy.http import Request
from scrapy.selector import Selector
from douban250.items import Douban250Item

class Douban250Spider(CrawlSpider):
  """docstring for Movie250Spider"""
  name = 'douban250'
  allowed_domains = ["douban.com"]
  start_urls=['https://movie.douban.com/top250']

  def parse(self, response):
    selector = Selector(response)
    Movies = selector.xpath('//div[@class="item"]')
    for info in Movies:
      item = Douban250Item()
      item['rank'] = info.xpath('div[@class="pic"]/em/text()').extract()
      item['title'] = info.xpath('div[@class="pic"]/a/img/@alt').extract()
      item['link'] = info.xpath('div[@class="pic"]/a/@href').extract()
      item['star'] = info.xpath('div[@class="info"]/div[@class="bd"]/div[@class="star"]/span/em/text()').extract()
      item['rate'] = info.xpath('div[@class="info"]/div[@class="bd"]/div[@class="star"]/span/text()').extract()
      item['quote'] = info.xpath('div[@class="info"]/div[@class="bd"]/p[@class="quote"]/span/text()').extract()
      yield item

    nextLink = selector.xpath('//span[@class="next"]/link/@href').extract()
    if nextLink:
      nextLink = nextLink[0]
      print nextLink
      yield Request(self.url + nextLink, callback=self.parse)