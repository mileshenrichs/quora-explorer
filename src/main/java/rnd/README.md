# Collecting some data to guide development

The technique used to incrementally render answers from each question and enumerate them in their entirety is painfully inefficient.  We're talking almost _2 seconds per 10 answers_. That's awful, so I've done some testing and data collection on a sample of popular Quora questions to try to determine if anything can be done to drastically improve runtime.

**Hypothesis**: for every question on Quora with more than 50 answers, its top answer will be one of the first 50 listed for the question

**How to test**: look at 40 questions that have 50 or more answers. For each question, run process to collect all answers, and record index of highest voted answer
             
My hypothesis was a little optimistic, but the results allowed me to reduce a lot of unnecessary work from the scraping process.

```$xslt
Question count: 40

Average answer count: 207
Average index of a top rated answer: 28
Worst ranked top answer index: 124/340
```