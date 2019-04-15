# InnovationHubWebsite

2018' Innovation Hub Website

## Editing the Site

The site has some automations and features added on top of normal git.

### [`git-lfs`]

In order to manage all of the large files on the website, we use [`git-lfs`]which must be installed on your computer in order to contribute to the website.

Once [`git-lfs`] has been installed, clone the repository with:

```
$ git clone https://github.com/FSUInnovationHub/InnovationHubWebsite.git
$ cd InnovationHubWebsite
$ git lfs get
```

It should not be necessary to run `git lfs get`, but do so if you happen to notice that image files and other large files are empty or corrupted.

[`git-lfs`]: https://git-lfs.github.com/

### Automated Deployments

Using GitHub's [Travis-ci] integration, the website will automatically update whenever a commit is pushed to the master branch.  Therefore, use **extreme** cution when merging code, and always do so by pull request if possible.

The website is also deployed on [netlify] which allows us to preview any changes made in pull requests.  Be sure to make use of this feature in order to review changes as they would appear on the live website!  This will let us catch errors before the website is live to the public.

[Travis-ci]: https://travis-ci.org
[netlify]: https://netlify.com

## Contributors

- Ken Baldauf
- Ben Cynamon
- Felicia "Mo" Reich
- Liz Dorwart
- Jonah Baer
- Fabuola Pierre
- Ariana M. Davis
