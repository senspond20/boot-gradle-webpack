package com.rgbitsoft.admin.graalvm;

import org.junit.jupiter.api.Test;

import javax.script.ScriptEngine;
import javax.script.ScriptEngineManager;
import javax.script.ScriptException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.Reader;

public class GraalvmTests {

    private Reader read(String path) {
        InputStream in = getClass().getClassLoader().getResourceAsStream(path);
        return new InputStreamReader(in);
    }
    @Test
    public void testJS() throws ScriptException {
        ScriptEngine engine = new ScriptEngineManager().getEngineByName("graal.js"); //  --- (1)
        engine.eval("print('Hello World');");
    }

    @Test
    public void testReadFileJS() throws ScriptException {
        ScriptEngine engine = new ScriptEngineManager().getEngineByName("graal.js"); //  --- (1)
        engine.eval(read("static/vue/server.bundle.js"));
    }

}