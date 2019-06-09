---
title: about
date: 2017-02-04 23:50:54
comments: false
---

> powered by python3

```python
class Macsnow(SoftwareEngineer):
    """
    About who I am.
    """
    __mataclass__ = humanity  # after all that's the meaning.
    
    University = "Xi'an JiaoTong University"
    Email = "Siyuan.arc@gmail.com"
    Home = "Xi'an, ShaanXi, China"
    Organization = "Function-X -> https://function-x.org/"
    Domain = "macsnow.cn"
    Interest = ["Python", "Blizzard product", "Internet", "Artificial Intellegence", ...]
    Skill = ["Python", "StarCraft II", ...]
    Description = "A mohist of SE with 70% curiosity & 30% determination to be Stronger."
    
    def __new__(self):
        raise DontThinkAboutItError("I, this class, am the only object.")
    
    def __init__(self):  # Listen to your heart, right?
        super(Macsnow, self).__init__()  # I am a SoftwareEngineer, or intend to be.
    
    def __str__(self):
        return "your memory couldn't hold the whole class. In short: %s" % (self.Description)
    
    def __del__(self):
        return Macsnow
    
    def __getattr__(self, heart):
        return self.heart if heart is not None else None
    
    def __setattr__(self, reasonability, name, value):
        with reasonability:
        	self.__dict__[name] = value
```

