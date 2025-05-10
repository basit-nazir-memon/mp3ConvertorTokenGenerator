const express = require('express');
const cheerio = require('cheerio');

const app = express();
const PORT = 3000;

app.get('/get-token', async (req, res) => {
    try {
        const fetch = (await import('node-fetch')).default;

        // keep changing the headers to avoid being blocked
        const headers = {
            'Authority': 'ytmp3.la',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
            'Accept-Encoding': 'gzip, deflate, br, zstd',
            'Accept-Language': 'en-US,en;q=0.9,ur;q=0.8,sd;q=0.7',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive',
            'Pragma': 'no-cache',
            'Priority': 'u=0, i',
            'Sec-Ch-Ua': '"Chromium";v="136", "Google Chrome";v="136", "Not.A/Brand";v="99"',
            'Sec-Ch-Ua-Mobile': '?1',
            'Sec-Ch-Ua-Platform': '"Android"',
            'Sec-Fetch-Dest': 'document',
            'Sec-Fetch-Mode': 'navigate',
            'Sec-Fetch-Site': 'none',
            'Sec-Fetch-User': '?1',
            'Upgrade-Insecure-Requests': '1',
            'User-Agent':  'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Mobile Safari/537.36'
        };

        const response = await fetch('https://ytmp3.la/LOF8/', {
            method: 'GET',
            headers: headers,
        });

        const html = await response.text();

        const $ = cheerio.load(html);
        const scripts = $('script');

        let encoded = null;

        scripts.each((i, script) => {
            const content = $(script).html();
            if (content && content.includes('eval(atob')) {
                const match = content.match(/eval\(atob\(['"`](.*?)['"`]\)\)/);
                if (match && match[1]) {
                    encoded = match[1];
                }
            }
        });

        if (!encoded) {
            return res.status(404).json({ error: 'Encoded string not found.' });
        }

        eval(atob(encoded));

        var gC = eval(gO[0]);
        gC.c = gC[gO[1]];

        if (((gC.f = gC[gO[2]]), (gC.t = gC[gO[3]]), eval(atob(gC.t[0])) != gC.t[1]))
            return !1;
        for (
            var key = gC.f[6].split("").reverse().join("") + gC.f[7], c = 0;
            c < atob(gC[0]).split(gC.f[5]).length;
            c++
        )
            key += (0 < gC.f[4] ? gC[1].split("").reverse().join("") : gC[1])[
                atob(gC[0]).split(gC.f[5])[c] - gC.f[3]
            ];
        const token = (
            1 == gC.f[1]
                ? (key =
                    key.substring(0, gC.f[6].length + gC.f[7].length) +
                    key.substring(gC.f[6].length + gC.f[7].length).toLowerCase())
                : 2 == gC.f[1] &&
                (key =
                    key.substring(0, gC.f[6].length + gC.f[7].length) +
                    key.substring(gC.f[6].length + gC.f[7].length).toUpperCase()),
            0 < gC.f[0].length
                ? btoa(
                    atob(gC.f[0]).replace(String.fromCharCode(gC.f[8]), "") + "_" + gC[2]
                )
                : 0 < gC.f[2]
                    ? btoa(
                        key.substring(0, gC.f[2] + (gC.f[6].length + gC.f[7].length)) +
                        "_" +
                        gC[2]
                    )
                    : btoa(key + "_" + gC[2])
        );

        return res.json({ token });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
