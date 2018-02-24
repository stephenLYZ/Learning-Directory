import scrapy
from scrapy.spider import Spider
from scrapy.selector import Selector
from scrapy.http import Request
from MOOCcrawler.items import MooccrawlerItem
from MOOCcrawler.bloomfliter import Bloomfliter


class MoocSpider(Spider):
	name = 'MoocSpider'
	allowed_domains = ['http://www.icourse163.org']

	# 初始化
    def __init__(self, name=None, **kwargs):
        if name is not None:
            self.name = name
        elif not getattr(self, 'name', None):
            raise ValueError("%s must have a name" % type(self).__name__)
        self.__dict__.update(kwargs)
        if not hasattr(self, 'start_urls'):
            self.start_urls = []

        self.bf=BloomFilter(0.0001,100000)
        self.mainpage = "http://www.icourse163.org/learn/uestc-234018?tid=275020#/learn/forumindex"
        self.count = 0
	def start_requests(self):
        yield Request(self.mainpage,callback=self.parse_mainPage)

    def parse_mainPage(self,response):
        sel=Selector(response)
        sites=sel.xpath('//div[@class="f-cb"]/a[@class="j-link"]/@href').extract()
        for site in sites:
            urls = "http://www.icourse163.org/learn/uestc-234018?tid=275020"+site
            if(self.bf.is_element_exist(urls)==False):
                yield Request(urls,callback=self.parse_inPage)
            else:
                continue

    def parse_inPage(self,response):
        sel=Selector(response)
        site=sel
        url=''
        item=MooccrawlerItem
        item["title"]=''
        item["content"]=''
        c=site.xpath('//link[@rel="canonical"]/@href').extract()
        currentUrl=c[0]
        self.bf.insert_element(currentUrl)

        contentList=site.xpath('//div[@class="f-richEditorText j-content "]/text()').extract() 
        for floor in contentList:
            utfcontent=floor.encode('utf-8')
            item["content"] += utfcontent
            item["content"] += "\n"

        titleList=site.xpath('//h3[contains(@class,"j-title")]/@title').extract()
        for t in titleList:
            title=t.encode('utf-8')
            item["title"] += title            
        yield item

        titleContentList=site.xpath('//div[contains(@class,"content")').extract()
        for t in titleContentListontent:
        	title_content = t.encode('utf-8')
        	item["title_content"] += title_content

        urlList=site.xpath('//li[contains(@class,"l_pager")]/a/@href').extract()
        for t in urlList:
            if (self.bf.is_element_exist("http://tieba.baidu.com"+t)==False):  
                yield Request("http://tieba.baidu.com"+t,callback=self.parse_inPage)
            else:
                continue

        self.count+=1
        if self.count%10==0:
            self.mainpage="http://tieba.baidu.com/f?kw=%E4%B8%AD%E5%B1%B1%E5%A4%A7%E5%AD%A6&ie=utf-8&pn="+str(self.count)
        yield Request(self.mainpage,callback=self.parse_mainPage)



