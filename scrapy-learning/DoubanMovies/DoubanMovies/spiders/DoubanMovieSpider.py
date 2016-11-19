# -*- coding:utf-8 -*-


__author__ = 'monkey'

import scrapy
from scrapy.spiders import CrawlSpider
from scrapy.http import Request
from scrapy.selector import Selector
from DoubanMovies.items import DoubanmoviesItem

class DoubanMovies(CrawlSpider):
    name = 'DoubanMovies'                           # 爬虫的名字
    start_urls = ['http://movie.douban.com/top250'] # 爬去的地址的列表

    url = 'http://movie.douban.com/top250'   #  拼接后面的链接需要用到

    def parse(self, response):
        item = DoubanmoviesItem()
        selector = Selector(response)
        Movies = selector.xpath('//div[@class="info"]')

        for each in Movies:
            title = each.xpath('div[@class="hd"]/a/span/text()').extract()

            # 一部电影可能会有多个名称
            fullTitle = ''
            for eachtitle in title:
                fullTitle += eachtitle

            info = each.xpath('div[@class="hd"]/p/text()').extract()
            star = each.xpath('div[@class="hd"]/div[@class="star"]/span/em/text()').extract()[0]
            quote = each.xpath('div[@class="hd"]/p/[@class="quote"]/span/text()').extract()

            # quote可能为空, 因此需要先进行判断
            if quote:
                quote = quote[0]
            else:
                quote = ''

            item['title'] = fullTitle
            item['info'] = info
            item['star'] = star
            item['quote'] = quote
            yield  item

        # 进行下一页爬取
        nextLink = selector.xpath('//span[@class="next"]/link/@href').extract()

        # 第10页是最后一页, 没有下一页的链接
        if nextLink:
            nextLink = nextLink[0]
            print nextLink
            yield  Request(self.url + nextLink, callback = self.parse)
        
