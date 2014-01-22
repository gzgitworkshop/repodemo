video-player
============


### Recommendation Architecture
***
# [View Code](https://github.com/Tribu-Zubu/Tribu-Zubu/blob/master/codes/RecommendationArchitachture.js)
***
### Core Functionality
***
The system basically just takes in all video data and filters them based on the filter data returns them as output.

![https://raw2.github.com/Tribu-Zubu/Tribu-Zubu/master/images/Recommendation-Architecture/1.png](https://raw2.github.com/Tribu-Zubu/Tribu-Zubu/master/images/Recommendation-Architecture/1.png)

### Design Pattern
***
The system relies heavily on [Composite Pattern](http://www.joezimjs.com/javascript/javascript-design-patterns-composite/), having both **Filter Data** and **Recommendation System** following this pattern.

![https://raw2.github.com/Tribu-Zubu/Tribu-Zubu/master/images/Recommendation-Architecture/2.png](https://raw2.github.com/Tribu-Zubu/Tribu-Zubu/master/images/Recommendation-Architecture/2.png)

**Specification:**

a. Video info

> Wraps video meta/tag info to keep a consistent structure when in use by the system even if the video meta/tag api/db changes over time.

b. Filter Data

> Serves as a platform to add new sources of data filters (user api, video library, task, etc)

c. Recommendation System

> Serves as a platform to add new filter logic (by subject, by grade level, etc)

d. Processed Video info

> Filters video meta/tags returned as JSON for use by the system.

e. FD1 ... FDn

> This object is created and registered to the **Filter Data** every time a new source of data filters needs to be added to the system.

f. RS1 ... RSn

> This object is created and registered to the **Recommendation System** every time a new filter logic needs to be added to the system

### System Flow
***

![https://raw2.github.com/Tribu-Zubu/Tribu-Zubu/master/images/Recommendation-Architecture/3.png](https://raw2.github.com/Tribu-Zubu/Tribu-Zubu/master/images/Recommendation-Architecture/3.png)


### Future Plans
***

**Priority**
>Current design is to queue RSn objects in the **Recommendation System** where first RS object added was the first to be process in the system.
In the future if the system needs prioritisation of RS objects; RS object should contain an attribute storing its priority number. We can design the logic of prioritisation the same with _z-index_ in HTML.

>Recommendation system will expose an API for to add a Handler of every RS object.

>RS unit handler - container of RS objects and manager of RS objects. e.g. RS object prioritisation

**Logic or Comparator Object**
>If the logic RS objects feed in the **Recommendation System** is no longer _and_. We might want to add a Comparator object to be feed in the system. Comparator object will contain:
a. RS Handlers or RS objects
b. Condition or logic (and, or)

***
>Note that future plans are just thoughts and suggestions but not critically planned.